import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0b0a08",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#f5f2ea",
            lineHeight: 1.2,
            marginBottom: "24px",
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            width: "120px",
            height: "4px",
            background: "#ff6b1a",
            marginBottom: "24px",
          }}
        />
        <div
          style={{
            fontSize: 32,
            color: "#a8a196",
            lineHeight: 1.4,
          }}
        >
          {site.tagline}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}