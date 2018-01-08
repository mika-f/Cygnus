// IO utility
import fs from "fs";
import mkdirp from "mkdirp";
import { dirname } from "path";

export function writeFile(path: string, content: string): void {
  mkdirp.sync(dirname(path));
  fs.writeFileSync(path, content);
}

export function readFile(path: string): string {
  if (fs.existsSync(path)) {
    return (new Buffer(fs.readFileSync(path))).toString();
  } else {
    return "";
  }
}
