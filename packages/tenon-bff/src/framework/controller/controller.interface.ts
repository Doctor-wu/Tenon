export interface IDecoratedController {
  new(...args: any[]): IDecoratedControllerExtraFields
}

export interface IDecoratedControllerExtraFields {
  prefixPath: string;
}
