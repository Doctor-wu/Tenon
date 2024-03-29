export function getValueByInjectContext(context: any, exp: string): any {
  if (exp === "undefined" || !exp) return undefined;
  return new Function('exp', 'context', `with(context){return (${exp});}`)(exp, context);
}
export function getValueByHackContext(context: any, exp: string): any {
  if (exp === "undefined" || !exp) return undefined;
  return new Function('exp', `return ${exp};`).call(context, exp);
}

export function createSleepFunc(time: number) {
  return () => new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

export function sleep(duration: number) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  });
};
