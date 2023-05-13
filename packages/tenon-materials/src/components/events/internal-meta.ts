export interface IMaterialInternalEventMeta {
  name: string;
  desc: string;
  internal: true;
}

export enum MaterialInternalEvent {
  Mount = 'onMount',
  UnMount = 'UnMount',
};

export const internalMeta:IMaterialInternalEventMeta[] = [
  {
    name: MaterialInternalEvent.Mount,
    desc: '组件挂载时',
    internal: true,
  },
  {
    name: MaterialInternalEvent.UnMount,
    desc: '组件卸载时',
    internal: true,
  },
];
