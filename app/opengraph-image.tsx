import { ImageResponse } from "next/og";
import { artist } from "@/data/artist";

// Branded, text-based OG image using only confirmed identity text (§38) —
// no stock photo or placeholder image passed off as final artwork. Applies
// as the default across the site until a route defines its own.
export const alt = `${artist.name} — ${artist.profession.join(", ")}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0b0a08",
          color: "#f4f0e6",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#c9974c",
            marginBottom: 28,
          }}
        >
          {artist.profession.join("  ·  ")}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 600,
            textAlign: "center",
            padding: "0 80px",
          }}
        >
          {artist.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            width: 160,
            height: 4,
            backgroundColor: "#c9974c",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
