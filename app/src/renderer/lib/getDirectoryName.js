import path from "path";

export default function getDirectoryName(directory) {
  return path.basename(directory);
}