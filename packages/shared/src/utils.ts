export function getValueByInjectContext(context: any, exp: string): any {
  if (exp === "undefined" || !exp) return undefined;
  return new Function('exp', 'context', `with(context){return (${exp});}`)(exp, context);
}
export function getValueByHackContext(context: any, exp: string): any {
  if (exp === "undefined" || !exp) return undefined;
  return new Function('exp', `return ${exp};`).call(context, exp);
}

export function inheritObject(sub, sup) {
  Reflect.setPrototypeOf(sub, sup);
}