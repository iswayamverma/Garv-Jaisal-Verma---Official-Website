import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { CurrentRelease } from "@/components/home/CurrentRelease";
import { MusicPreview } from "@/components/home/MusicPreview";
import { AboutPreview } from "@/components/home/AboutPreview";
import { VideoSection } from "@/components/home/VideoSection";
import { LiveSection } from "@/components/home/LiveSection";
import { MediaPreview } from "@/components/home/MediaPreview";
import { ContactCTA } from "@/components/home/ContactCTA";

export const metadata: Metadata = {
  title: "Home",
  alternates: { canonical: "/" },
};

// Content priority per §11: Header → Hero → Current Release → Music
// Preview → About Preview → Video → Live [conditional] → Media Preview
// → Contact CTA → Footer. (Header/Footer live in the root layout.)
export default function HomePage() {
  return (
    <>
      <Hero />
      <CurrentRelease />
      <MusicPreview />
      <AboutPreview />
      <VideoSection />
      <LiveSection />
      <MediaPreview />
      <ContactCTA />
    </>
  );
}
