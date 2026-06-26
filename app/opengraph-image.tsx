import { ImageResponse } from "next/og";

export const alt = "ends.to — Custom Link Preview Generator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0a",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "#a5b4fc",
            fontSize: 32,
            fontWeight: 600,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "#6366f1",
              color: "#fff",
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            e
          </div>
          ends.to
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          Custom Link Preview Generator
        </div>
        <div style={{ marginTop: 28, fontSize: 34, color: "#9ca3af", maxWidth: 900 }}>
          Choose the title, description, and thumbnail your link shows when
          shared — then point it anywhere.
        </div>
      </div>
    ),
    { ...size },
  );
}
