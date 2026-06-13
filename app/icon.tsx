import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import path from "path";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  const fontData = readFileSync(
    path.join(process.cwd(), "public/fonts/MonsieurLaDoulaise-Regular.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: 64,
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: "Monsieur La Doulaise",
            fontSize: 48,
            color: "#f6cf78",
            lineHeight: 1,
            paddingTop: 8,
          }}
        >
          JL
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Monsieur La Doulaise",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
