import { TenonComponent } from "./component";

export const tree2config = (config: TenonComponent) => {
  return config.serialize();
};

export const config2tree = ({ materialsMap }) => (config: any, sup?: any): TenonComponent => {

  const instance = TenonComponent.createInstanceByDeserialize(config, materialsMap)!;

  if (sup) {
    config.parent = sup;
  }

  return instance;
}