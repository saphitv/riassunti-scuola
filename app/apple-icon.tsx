import { ImageResponse } from "next/og";
import { getAppIconDataUrl } from "@/lib/appIcon";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default async function AppleIcon() {
  const iconSrc = await getAppIconDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: size.width,
          height: size.height,
          backgroundImage: `url(${iconSrc})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
    ),
    size,
  );
}
