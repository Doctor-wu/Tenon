
export class BaseNotification<Type = string> {
  type: Type;
  constructor(type: Type) {
    this.type = type;
  }
};
