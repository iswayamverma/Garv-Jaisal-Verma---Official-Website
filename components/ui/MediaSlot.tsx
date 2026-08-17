"use client";

import { useState } from "react";
import { CldImage } from "next-cloudinary";
import { Camera, Disc3, Mic2, Image as ImageIcon } from "lucide-react";
import { Waveform } from "./Waveform";
import { cn, isPlaceholder } from "@/lib/utils";

type Aspect = "square" | "portrait" | "landscape" | "wide";
type SlotIcon = "photo" | "artwork" | "portrait" | "generic";

const aspectClass: Record<Aspect, string> = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
};

const icons: Record<SlotIcon, typeof Camera> = {
  photo: Camera,
  artwork: Disc3,
  portrait: Mic2,
  generic: ImageIcon,
};

interface MediaSlotProps {
  /** Cloudinary public ID. Leave unset until a real asset is uploaded. */
  publicId?: string;
  alt: string;
  label?: string;
  icon?: SlotIcon;
  aspect?: Aspect;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Extra classes for the image itself, e.g. to control crop position responsively. */
  imageClassName?: string;
}

/**
 * A single media slot: either a real Cloudinary-served image, or the
 * site's placeholder treatment.
 *
 * Falls back to the placeholder in three cases, per PDD §41a's Cloudinary
 * failure contract: no cloud name configured, no public ID supplied yet
 * (or it's an unfilled `[PLACEHOLDER]` token), or the image actually fails
 * to load at runtime (broken public ID / network failure). All three read
 * as the same intentional, on-brand empty state — never a broken-image
 * icon, never a layout-collapsing blank space (§0.2, §41a).
 */
export function MediaSlot({
  publicId,
  alt,
  label,
  icon = "photo",
  aspect = "square",
  sizes = "100vw",
  priority = false,
  className,
  imageClassName,
}: MediaSlotProps) {
  const [failed, setFailed] = useState(false);
  const cloudConfigured = Boolean(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
  const hasRealAsset = Boolean(publicId) && !isPlaceholder(publicId);
  const showImage = cloudConfigured && hasRealAsset && !failed;
  const Icon = icons[icon];

  if (!showImage) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "relative flex flex-col items-center justify-center gap-3 overflow-hidden border border-paper/10 bg-gradient-to-br from-charcoal to-ink",
          aspectClass[aspect],
          className
        )}
      >
        <Waveform bars={28} className="absolute inset-0 h-full w-full text-paper/[0.06]" />
        <span className="relative flex size-12 items-center justify-center rounded-full border border-ember/30">
          <Icon className="size-5 text-ember/70" aria-hidden="true" />
        </span>
        {label ? (
          <span className="relative text-[0.65rem] font-medium uppercase tracking-[0.24em] text-ash">
            {label}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", aspectClass[aspect], className)}>
      <CldImage
        src={publicId as string}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", imageClassName)}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
