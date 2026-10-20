import React, { Suspense, useState } from "react";
import { createPortal } from "react-dom";

// The 3D viewer (and the three.js build it fetches) loads only after a click, so the
// About section costs one small image until someone actually wants the 3D version.
const AvatarViewer = React.lazy(() => import("@/components/shared/AvatarViewer"));

export default function MiniJoe({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Meet mini Joe in 3D"
        title="Meet mini Joe in 3D"
        className={`group relative shrink-0 ${className}`}
      >
        {/* a bare <picture> is inline and would let the image render at full size */}
        <picture className="block h-full">
          <source srcSet="/images/avatar/mini-joe-wave.webp" type="image/webp" />
          <img
            src="/images/avatar/mini-joe-wave.png"
            alt="Mini Joe, a 3D clay version of Joseph, waving"
            width={420}
            height={648}
            loading="lazy"
            className="h-full w-auto object-contain transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:rotate-[-3deg] motion-reduce:transition-none motion-reduce:transform-none"
          />
        </picture>
      </button>
      {/* Portal to <body>: the About cards are motion-transformed, and a fixed overlay
          inside a transformed parent would be pinned to that card, not the viewport */}
      {open &&
        createPortal(
          <Suspense fallback={null}>
            <AvatarViewer onClose={() => setOpen(false)} />
          </Suspense>,
          document.body
        )}
    </>
  );
}
