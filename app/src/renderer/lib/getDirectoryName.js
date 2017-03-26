import path from "path";

export default function getDirectoryName(directory) {
  return path.win32.basename(directory);
}