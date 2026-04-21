import { readFile } from "node:fs/promises";
import path from "node:path";

let cachedDataUrl: string | null = null;

export async function getAppIconDataUrl() {
  if (cachedDataUrl) {
    return cachedDataUrl;
  }

  const iconPath = path.join(
    process.cwd(),
    "public",
    "mascot",
    "red-panda-app-icon-study.png",
  );
  const iconBuffer = await readFile(iconPath);

  cachedDataUrl = `data:image/png;base64,${iconBuffer.toString("base64")}`;
  return cachedDataUrl;
}
