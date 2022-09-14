import { newable } from "@tenon/shared";

export interface IService<T extends newable = newable> {
  name: string;
  loader: Loader<T>;
  onLoad?: (feature: T) => void;
  instance?: T;
}


export type Loader<T> = () => T;