interface WaveformProps {
  bars?: number;
  className?: string;
}

/**
 * A row of waveform bars, rendered in `currentColor` so a parent can tint
 * and fade it with ordinary Tailwind text-color/opacity utilities.
 *
 * This is the site's signature device (see design notes in README): every
 * empty media slot and data-loading skeleton uses the same waveform motif
 * instead of a generic gray box or spinner, so the "nothing here yet"
 * moments still read as intentional and on-brand for a
 * singer/composer/producer rather than as an unfinished template.
 *
 * Bar heights are derived deterministically from their index (not
 * `Math.random()`) so server and client render identically and there is
 * no hydration mismatch.
 */
export function Waveform({ bars = 48, className }: WaveformProps) {
  const heights = Array.from({ length: bars }, (_, i) => {
    const seed = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
    const frac = seed - Math.floor(seed);
    const height = 12 + frac * 88;
    return Math.round(height * 100) / 100;
  });

  return (
    <svg
      viewBox={`0 0 ${bars * 3} 100`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {heights.map((h, i) => (
        <rect key={i} x={i * 3} y={(100 - h) / 2} width={1.7} height={h} rx={0.85} fill="currentColor" />
      ))}
    </svg>
  );
}
