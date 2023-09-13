export class Subscribe {
  private events: {
    [props: string | symbol]: (Function | null)[]
  } = {};

  public on(eventName: string | symbol, handler: Function) {
    if (!this.events[eventName]) this.events[eventName] = [];
    this.events[eventName].push(handler);
  }

  public once(eventName: string | symbol, handler: Function) {
    if (!this.events[eventName]) this.events[eventName] = [];
    const handlerAgent = (...args) => {
      this.cancel(eventName, handlerAgent);
      handler.call(null, ...args);
    }
    this.events[eventName].push(handlerAgent);
  }

  public cancel(eventName: string | symbol, cancelHandler: Function) {
    const idx = this.events[eventName].findIndex(handler => cancelHandler === handler);
    if (idx === -1) return;
    this.events[eventName][idx] = null;
  }

  public emit(eventName: string | symbol, ...payloads: any[]) {
    if (!this.events[eventName]) return;

    this.events[eventName].forEach(handler => {
      if (handler === null) return;
      handler.apply(null, payloads);
    })
  }
}
