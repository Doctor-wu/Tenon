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

export function compose(...args: Function[]) {
  if (args.length <= 0) return () => {
    console.error('compose needs args');
  };
  return function (this: any, ...executeArgs: any[]) {
    return args.reduce((last, curr) => {
      return curr.call(null, last);
    }, args[0].apply(null, executeArgs));
  }
}

export function asyncCompose(...args: Function[]) {
  if (args.length <= 0) return () => {
    console.error('compose needs args');
  };

  return async function (this: any, ...executeArgs: any[]) {
    return args.reduce((last, curr, currIndex) => {
      if (currIndex === 0) return last;

      return curr.call(null, last);
    }, args[0].apply(null, executeArgs));
  }
}