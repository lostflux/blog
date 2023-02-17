
/**
 * Join a sequence of paths together, sequentially, into one.
 * The paths may be passed in as a list of arguments or as individual arguments.
 * 
 * @param paths The paths to join together.
 * 
 * NOTE: These may be passed in as so:
 * 
 * 1. `joinPaths('a', 'b', 'c')`
 * 2. `joinPaths(['a', 'b', 'c'])`
 * 
 * @returns The joined path as a `string`.
 * @returns An empty string (`''`) if no paths are passed in.
 */
export function joinPaths(...paths: string[]) {
  paths.forEach((arg, i) => {
    if ( (arg.startsWith('/') || arg.startsWith('./')) && i !== 0) {
      paths[i] = arg.slice(1);
    }
    if (arg.endsWith('/') && i !== paths.length - 1) {
      paths[i] = arg.slice(0, -1);
    }
  });
  return paths.join('/').replace(/\/+/g, '/');
}

export function hashPath(path: string) {
  const trimmedPath = path.split('#')[0];
  return trimmedPath.replace('/', '#');
}

export function unHashPath(path: string) {
  return path.replace('#', '/');
}
