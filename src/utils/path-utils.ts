export function getRelativePath(path: string): string {
  if (path.startsWith("/")) {
    return import.meta.env.BASE_URL + path.substring(1);
  }
  return path;
}
