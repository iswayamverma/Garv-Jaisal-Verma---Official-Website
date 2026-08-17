"use client";

import { useEffect, useState } from "react";
import type { TouchEvent } from "react";
import { CldImage } from "next-cloudinary";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { MediaSlot } from "@/components/ui/MediaSlot";

interface PhotoLightboxProps {
  photos: (string | undefined)[];
  altPrefix: string;
}

export function PhotoLightbox({ photos, altPrefix }: PhotoLightboxProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const close = () => setOpenIndex(null);
  const showPrev = () =>
    setOpenIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
  const showNext = () => setOpenIndex((i) => (i === null ? null : (i + 1) % photos.length));

  useEffect(() => {
    if (openIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [openIndex]);

  const onTouchStart = (event: TouchEvent) => {
    const touch = event.touches[0];
    if (touch) setTouchStartX(touch.clientX);
  };

  const onTouchEnd = (event: TouchEvent) => {
    if (touchStartX === null) return;
    const touch = event.changedTouches[0];
    if (!touch) return;
    const deltaX = touch.clientX - touchStartX;
    if (Math.abs(deltaX) > 50) {
      deltaX > 0 ? showPrev() : showNext();
    }
    setTouchStartX(null);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
        {photos.map((publicId, i) =>
          publicId ? (
            <button
              key={i}
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`View ${altPrefix} press photo ${i + 1} larger`}
              className="group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"
            >
              <MediaSlot
                publicId={publicId}
                alt={`${altPrefix} press photo ${i + 1}`}
                icon="photo"
                label="Press Photo"
                aspect="portrait"
                className="transition-opacity group-hover:opacity-90"
              />
            </button>
          ) : (
            <MediaSlot
              key={i}
              alt={`${altPrefix} press photo ${i + 1}`}
              icon="photo"
              label="Press Photo"
              aspect="portrait"
            />
          )
        )}
      </div>

      {openIndex !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          onClick={close}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Close"
            className="absolute right-4 top-4 flex size-11 items-center justify-center text-paper transition-colors hover:text-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"
          >
            <X className="size-7" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center text-paper transition-colors hover:text-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember sm:left-6"
          >
            <ChevronLeft className="size-8" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next photo"
            className="absolute right-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center text-paper transition-colors hover:text-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember sm:right-6"
          >
            <ChevronRight className="size-8" aria-hidden="true" />
          </button>

          <div className="relative h-[80vh] w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            {photos[openIndex] ? (
              <CldImage
                src={photos[openIndex] as string}
                alt={`${altPrefix} press photo ${openIndex + 1}`}
                fill
                sizes="100vw"
                quality="auto"
                className="object-contain"
              />
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}