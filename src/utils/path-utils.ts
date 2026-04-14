export function getRelativePath(path: string): string {
  if (path.startsWith("/")) {
    return import.meta.env.BASE_URL + path;
  }

  return import.meta.env.BASE_URL + '/' + path;

  
}
