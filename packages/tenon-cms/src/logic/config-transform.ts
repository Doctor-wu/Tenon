import { useStore } from "../store";

const store = useStore();
const materialsMap = store.getters["materials/getMaterialsMap"];

export const tree2config = (config: any) => {
  let newConfig: any = {};
  const extractKey = [
    'parent',
    'children',
    'material',
  ]
  for (let key in config) {
    if (extractKey.includes(key)) continue;
    newConfig[key] = config[key];
  }
  if (config.children) {
    newConfig.children = config.children.map(child => {
      return tree2config(child);
    });
  }
  return newConfig;
};

export const config2tree = (config: any, parent?: any) => {
  if (parent) {
    config.parent = parent;
  }
  config.material = materialsMap.get(config.name)();
  if (config.children) {
    config.children.forEach(child => {
      config2tree(child, config);
    });
  }
  return config;
}