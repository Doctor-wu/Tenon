export class Subscribe {
  private events: {
    [props: string]: Function[]
  } = {};

  public on(eventName: string, handler: Function) {
    if (!this.events[eventName]) this.events[eventName] = [];
    this.events[eventName].push(handler);
  }

  public emit(eventName: string, ...payloads: any[]) {
    if (!this.events[eventName]) return;
    this.events[eventName].forEach(handler => {
      handler.apply(null, payloads);
    })
  }
}