export function getValueByInjectContext(context: any, exp: string): any {
  return new Function('exp', `return ${exp};`).call(context, exp);
}