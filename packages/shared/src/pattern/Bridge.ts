
export class Bridge<Actions extends Record<any, any>> {
  private map = new Map<keyof Actions,  Set<Actions[keyof Actions]>>();

  register<K extends keyof Actions>(name: K, handler: Actions[K]) {
    if (!this.map.get(name)) this.map.set(name, new Set);
    this.map.get(name)?.add(handler);
  }

  run<K extends keyof Actions>(name: K, ...args: Parameters<Actions[K]>) {
    this.map.get(name)?.forEach(handler => {
      handler(...args);
    });
  }
}