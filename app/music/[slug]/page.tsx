import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { releases } from "@/data/releases";
import { formatDate, primaryStreamingUrl } from "@/lib/utils";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { CtaLink } from "@/components/ui/CtaLink";
import { Container } from "@/components/ui/Container";

interface SingleReleasePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return releases
    .filter((release) => release.type === "single")
    .map((release) => ({ slug: release.slug }));
}

export async function generateMetadata({ params }: SingleReleasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const release = releases.find((r) => r.slug === slug && r.type === "single");
  if (!release) return {};
  return {
    title: release.title,
    description: release.shortDescription ?? release.description,
  };
}

export default async function SingleReleasePage({ params }: SingleReleasePageProps) {
  const { slug } = await params;
  const release = releases.find((r) => r.slug === slug && r.type === "single");

  if (!release) notFound();

  const listenUrl = primaryStreamingUrl(release);

  return (
    <Container className="flex flex-col items-center gap-10 py-32 text-center">
      <div className="flex flex-col gap-3">
        <h1 className="font-display text-4xl text-paper sm:text-5xl">{release.title}</h1>
        <p className="text-xs uppercase tracking-[0.2em] text-ash">
          Released: {formatDate(release.releaseDate)}
        </p>
      </div>

      <MediaSlot
        publicId={release.artwork}
        alt={`${release.title} artwork`}
        icon="artwork"
        label="Album Artwork"
        aspect="square"
        className="w-full max-w-md"
      />

      {listenUrl ? (
        <CtaLink href={listenUrl} showArrow>
          Listen
        </CtaLink>
      ) : (
        <CtaLink disabled disabledReason="Streaming link coming soon">
          Listen
        </CtaLink>
      )}
    </Container>
  );
}