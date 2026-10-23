import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

/**
 * Full-screen image viewer. Shared by Milestones, Tennis & Coffee, AskJoseph and
 * the blog articles, so changes here are site-wide.
 *
 * Closes on: backdrop click, the X button, and Escape. The image itself stops
 * propagation so clicking the photo does not dismiss it.
 *
 * Mobile notes, learned the hard way:
 * - Body scroll is locked while open. Without it the page behind keeps scrolling
 *   under the overlay on iOS, and closing drops you somewhere else entirely.
 * - The close button is 44px, the minimum reliable touch target, and sits inside
 *   the safe area so it is not under the notch or a rounded corner.
 *
 * Keyboard: focus moves to the close button on open, Tab cycles inside the dialog,
 * and focus returns to whatever opened it on close (same contract as AvatarViewer).
 */
export default function Lightbox({
  src,
  alt,
  video,
  onClose,
}: {
  src: string;
  alt?: string;
  // A vertical embed (YouTube Short) shown in place of the image. The iframe only
  // exists while the viewer is open, so nothing loads from YouTube until a click.
  video?: { src: string; title: string };
  onClose: () => void;
}) {
  const open = Boolean(src || video);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  // Callers pass inline arrows; keep the latest in a ref so a parent re-render
  // never re-runs the effect (which would bounce focus and lose the opener).
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  useEffect(() => {
    // Guard on open (an image src or a video), and keep it in the deps. Some callers render <Lightbox> with
    // an empty src permanently mounted (TennisCoffeeSection does this on the
    // landing page) and rely on the `if (!src) return null` below to hide it.
    // That return happens AFTER this effect, so without this guard the scroll
    // lock fires on a viewer nobody opened and never unmounts to release it,
    // which froze the landing page.
    if (!open) return;

    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onCloseRef.current();
      if (e.key !== "Tab" || !dialogRef.current) return;
      const items = dialogRef.current.querySelectorAll<HTMLElement>("button, iframe, a[href]");
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      else if (!dialogRef.current.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    };
    // Tab presses inside a cross-origin iframe never reach this window, so also
    // pull focus back if it ever lands outside the dialog.
    const onFocusIn = (e: FocusEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) closeRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("focusin", onFocusIn);

    // Lock background scroll, restoring whatever the page had before.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("focusin", onFocusIn);
      document.body.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[100] bg-espresso/80 dark:bg-[#0B1220]/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={video?.title || alt || "Image viewer"}
    >
      <button
        ref={closeRef}
        className="absolute top-4 right-4 h-11 w-11 inline-flex items-center justify-center rounded-lg bg-paper dark:bg-slate-800 border-2 border-espresso dark:border-slate-600 shadow-brutal-sm dark:shadow-none text-espresso dark:text-slate-100 hover:shadow-brutal dark:hover:border-[#60A5FA]/50 transition-all"
        style={{ top: "max(1rem, env(safe-area-inset-top))", right: "max(1rem, env(safe-area-inset-right))" }}
        onClick={onClose}
        aria-label={video ? "Close video" : "Close image"}
      >
        <X className="h-6 w-6" />
      </button>
      {video ? (
        <div
          className="aspect-[9/16] max-w-[92vw] overflow-hidden rounded-xl border-2 border-espresso dark:border-slate-600 shadow-brutal-lg dark:shadow-none bg-black"
          style={{ height: "min(85vh, calc(92vw * 16 / 9))" }}
          onClick={(e) => e.stopPropagation()}
        >
          <iframe
            src={video.src}
            title={video.title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      ) : (
      <img
        src={src}
        alt={alt || "image"}
        className="max-h-[85vh] max-w-[92vw] object-contain rounded-xl border-2 border-espresso dark:border-slate-600 shadow-brutal-lg dark:shadow-none"
        onClick={(e) => e.stopPropagation()}
      />
      )}
    </div>
  );
}
