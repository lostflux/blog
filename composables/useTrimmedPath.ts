/**
 * Removes trailing slash from path
 * @param path
 * @returns string representing the path without trailing slash
 */
export default (currentPath?: string) => {
  const { path: rawPath } = currentPath
    ? { path: currentPath }
    : useRoute();

  // remove trailing slash
  const path = rawPath.endsWith("/") && rawPath.length > 1 ? rawPath.slice(0, -1) : rawPath;
  return { path };
};
