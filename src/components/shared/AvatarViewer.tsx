import React, { useEffect, useRef, useState } from "react";
import { X, RotateCw } from "lucide-react";
import { createAvatar } from "@/lib/avatar3d";

// three.js is not an npm dependency of the site: a tree-shaken build is served from
// /public/vendor and fetched only when this viewer opens, so no other page pays for it.
const THREE_URL = "/vendor/three/three-avatar-0.186.1.min.js";

const POSES = [
  { key: "wave", label: "Wave" },
  { key: "happy", label: "Happy" },
  { key: "thinking", label: "Thinking" },
  { key: "coffee", label: "Coffee" },
  { key: "music", label: "Music" },
  { key: "desk", label: "At my desk" },
] as const;

type Props = { onClose: () => void };

export default function AvatarViewer({ onClose }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const apiRef = useRef<{ pose: (p: string) => void } | null>(null);
  const [pose, setPose] = useState<string>("wave");
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  // Close on Escape, lock the page behind while open (same contract as the shared Lightbox).
  // Focus moves into the dialog, Tab cycles inside it, and returns to the opener on close.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab" || !dialogRef.current) return;
      const items = dialogRef.current.querySelectorAll<HTMLElement>("button");
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      else if (!dialogRef.current.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      opener?.focus();
    };
  }, [onClose]);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    (async () => {
      try {
        // a full URL built at runtime: the Vite dev server refuses to import JS from /public by path
        const THREE: any = await import(/* @vite-ignore */ new URL(THREE_URL, window.location.origin).href);
        const host = mountRef.current;
        if (disposed || !host) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;
        renderer.toneMapping = THREE.NoToneMapping;
        host.appendChild(renderer.domElement);
        renderer.domElement.style.touchAction = "none";

        const scene = new THREE.Scene();
        const pmrem = new THREE.PMREMGenerator(renderer);
        scene.environment = pmrem.fromScene(new THREE.RoomEnvironment(), 0.04).texture;
        scene.environmentIntensity = 0.3;
        scene.add(new THREE.HemisphereLight("#FFFFFF", "#E6D9C6", 0.75));
        const key = new THREE.DirectionalLight("#FFF6EA", 1.25);
        key.position.set(-2.5, 5, 4);
        key.castShadow = true;
        key.shadow.mapSize.set(1024, 1024);
        key.shadow.radius = 6;
        key.shadow.bias = -0.0004;
        Object.assign(key.shadow.camera, { left: -3, right: 3, top: 4, bottom: -1, near: 0.5, far: 15 });
        scene.add(key);
        const rim = new THREE.DirectionalLight("#FFFFFF", 1.1);
        rim.position.set(3, 3, -4);
        scene.add(rim);

        const av = createAvatar(THREE);
        av.group.traverse((o: any) => { if (o.isMesh) o.receiveShadow = true; });
        const spin = new THREE.Group();
        spin.add(av.group);
        scene.add(spin);
        av.pose("wave");
        apiRef.current = { pose: (p: string) => av.pose(p) };

        const cam = new THREE.PerspectiveCamera(26, 1, 0.1, 100);
        const fit = () => {
          const w = host.clientWidth, h = host.clientHeight;
          renderer.setSize(w, h, false);
          renderer.domElement.style.width = "100%";
          renderer.domElement.style.height = "100%";
          cam.aspect = w / h;
          // pull back on narrow screens so the whole figure stays in frame
          const dist = w / h < 0.8 ? 12.5 : 10;
          cam.position.set(0, 2.1, dist);
          cam.lookAt(0, 1.45, 0);
          cam.updateProjectionMatrix();
        };
        fit();
        const ro = new ResizeObserver(fit);
        ro.observe(host);

        // drag to turn; a slow idle turn when untouched (off for reduced motion)
        let dragging = false, lastX = 0, velocity = 0, idle = !reduce;
        const el = renderer.domElement;
        const down = (e: PointerEvent) => { dragging = true; idle = false; lastX = e.clientX; el.setPointerCapture(e.pointerId); };
        const move = (e: PointerEvent) => { if (!dragging) return; const dx = e.clientX - lastX; lastX = e.clientX; spin.rotation.y += dx * 0.01; velocity = dx * 0.01; };
        const up = () => { dragging = false; };
        el.addEventListener("pointerdown", down);
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerup", up);
        el.addEventListener("pointercancel", up);

        let raf = 0, t = 0;
        const loop = () => {
          raf = requestAnimationFrame(loop);
          t += 1 / 60;
          if (!dragging) {
            if (idle) spin.rotation.y += 0.004;
            else if (!reduce) { spin.rotation.y += velocity; velocity *= 0.92; }
          }
          if (!reduce) av.group.position.y = Math.sin(t * 2) * 0.012; // a gentle breath
          av.set({ steam: t });
          renderer.render(scene, cam);
        };
        loop();
        setStatus("ready");

        cleanup = () => {
          cancelAnimationFrame(raf);
          ro.disconnect();
          el.removeEventListener("pointerdown", down);
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerup", up);
          el.removeEventListener("pointercancel", up);
          scene.traverse((o: any) => {
            o.geometry?.dispose?.();
            const mats = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
            mats.forEach((m: any) => { m.map?.dispose?.(); m.dispose?.(); });
          });
          pmrem.dispose();
          renderer.dispose();
          el.remove();
        };
      } catch {
        if (!disposed) setStatus("error");
      }
    })();
    return () => { disposed = true; cleanup(); apiRef.current = null; };
  }, []);

  const choose = (p: string) => { setPose(p); apiRef.current?.pose(p); };

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[100] bg-espresso/80 dark:bg-[#0B1220]/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Mini Joe in 3D"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close 3D viewer"
        className="absolute right-4 h-11 w-11 rounded-full bg-paper dark:bg-slate-800 border-2 border-espresso dark:border-slate-600 flex items-center justify-center text-espresso dark:text-slate-100 shadow-brutal-sm dark:shadow-none"
        style={{ top: "max(1rem, env(safe-area-inset-top))" }}
      >
        <X className="h-5 w-5" />
      </button>

      <div
        className="card-brutal w-full max-w-lg overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div ref={mountRef} className="relative w-full h-[60dvh] max-h-[520px] min-h-[340px] cursor-grab active:cursor-grabbing">
          {status !== "ready" && (
            <div className="absolute inset-0 flex items-center justify-center text-sm font-mono text-espresso/70 dark:text-slate-400">
              {status === "loading" ? (
                <span className="inline-flex items-center gap-2"><RotateCw className="h-4 w-4 animate-spin" /> Loading mini Joe...</span>
              ) : (
                <span>3D needs WebGL, which this browser has turned off.</span>
              )}
            </div>
          )}
        </div>
        <div className="border-t-2 border-espresso/10 dark:border-white/10 p-4">
          <p className="text-xs font-mono text-espresso/70 dark:text-slate-400 mb-3 text-center">Drag to turn me around</p>
          <div className="flex flex-wrap justify-center gap-2">
            {POSES.map((p) => (
              <button
                key={p.key}
                type="button"
                onClick={() => choose(p.key)}
                aria-pressed={pose === p.key}
                className={`px-3.5 py-1.5 rounded-full text-sm font-mono border-2 transition-colors ${
                  pose === p.key
                    ? "bg-court text-espresso border-espresso dark:bg-[#60A5FA]/15 dark:text-[#60A5FA] dark:border-[#60A5FA]/40"
                    : "bg-paper text-espresso border-espresso/20 hover:border-espresso/50 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
