import { isPlaceholder } from "@/lib/utils";

export function BioSection({ name, bio }: { name: string; bio: string }) {
  const bioReady = !isPlaceholder(bio);

  if (!bioReady) {
    return (
      <p className="max-w-prose text-pretty text-lg italic leading-relaxed text-ash">
        A full press biography for {name} is coming soon.
      </p>
    );
  }

  // Split into sentences so the first one can be styled as a large lead
  // line, echoing the "pull quote" treatment used on the About page.
  const sentences = bio.split(/(?<=\.)\s+/);
  const lead = sentences[0];
  const rest = sentences.slice(1).join(" ");

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[auto_1fr] lg:gap-16">
      <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-6">
        <span className="h-px w-10 bg-ember lg:h-full lg:w-px" aria-hidden />
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-ember">Biography</p>
      </div>
      <div className="flex flex-col gap-6">
        <p className="text-balance font-display text-2xl font-medium leading-snug text-paper sm:text-3xl lg:text-[2rem]">
          {lead}
        </p>
        {rest ? (
          <p className="max-w-[65ch] text-pretty text-base leading-relaxed text-paper/75">
            {rest}
          </p>
        ) : null}
      </div>
    </div>
  );
}