import path from "path";

// Convert relative path to absolute path.
export function abspath(p: string): string {
  if (p.startsWith("~")) {
    p = path.join(process.env.HOME || process.env.USERPROFILE || "", p.substring(1));
  }
  return p;
}
