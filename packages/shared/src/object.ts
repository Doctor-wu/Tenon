
export function inheritObject(sub, sup) {
  Reflect.setPrototypeOf(sub, sup);
}