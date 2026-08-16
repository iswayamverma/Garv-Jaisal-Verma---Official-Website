import { Mic2, PenTool, Sliders } from "lucide-react";

const facets = [
  {
    role: "Singer",
    Icon: Mic2,
    description: "Voice and performance — the front of the stage.",
  },
  {
    role: "Composer",
    Icon: PenTool,
    description: "Melody, harmony and songwriting — where a track begins.",
  },
  {
    role: "Producer",
    Icon: Sliders,
    description: "Arrangement and sound — where a track takes shape.",
  },
];

/**
 * Singer/Composer/Producer are presented as facets of one identity, not
 * separate sections with their own routes (§25).
 */
export function ArtistIdentity() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
      {facets.map(({ role, Icon, description }) => (
        <div key={role} className="flex flex-col gap-3 border-t border-ember/40 pt-6">
          <Icon className="size-5 text-ember" aria-hidden="true" />
          <h3 className="font-display text-xl text-paper">{role}</h3>
          <p className="text-sm leading-relaxed text-ash">{description}</p>
        </div>
      ))}
    </div>
  );
}
