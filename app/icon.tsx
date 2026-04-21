import { ImageResponse } from "next/og";
import { getAppIconDataUrl } from "@/lib/appIcon";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default async function Icon() {
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
