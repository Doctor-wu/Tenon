
export function inheritObject(sub, sup) {
  Reflect.setPrototypeOf(sub, sup);
}

export function recursiveGetValue(obj: any, path: string) {
  if (!obj) return;
  if (path.includes('.')) {
    const [key, ...rest] = path.split('.');
    return recursiveGetValue(obj[key], rest.join('.'));
  }
  return obj[path];
}