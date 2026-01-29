import React, { useEffect } from "react";
import { X } from "lucide-react";

export default function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt?: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!src) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-espresso/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        className="absolute top-4 right-4 p-2 rounded-lg bg-paper border-2 border-espresso shadow-brutal-sm hover:shadow-brutal text-espresso transition-all"
        onClick={onClose}
        aria-label="Close"
      >
        <X className="h-6 w-6" />
      </button>
      <img
        src={src}
        alt={alt || "image"}
        className="max-h-[85vh] max-w-[92vw] object-contain rounded-xl border-2 border-espresso shadow-brutal-lg"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
