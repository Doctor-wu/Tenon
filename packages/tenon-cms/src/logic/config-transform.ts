import { ComponentTreeNode } from "../store/modules/viewer";
import { useStore } from "../store";
import { reactive, toRaw } from "vue";

export const tree2config = (config: ComponentTreeNode) => {
  let newConfig: any = {};
  const extractKey = [
    'parent',
    'children',
    'material',
    'props',
  ]
  for (let key in config) {
    if (extractKey.includes(key)) continue;
    newConfig[key] = config[key];
  }
  if (config.props) {
    newConfig.props = toRaw(config.props);
  }
  if (config.children) {
    newConfig.children = config.children.map(child => {
      return tree2config(child);
    });
  }
  return newConfig;
};

export const config2tree = (config: any, sup?: any): ComponentTreeNode => {
  const store = useStore();
  const materialsMap = store.getters["materials/getMaterialsMap"];
  if (sup) {
    config.parent = sup;
  }
  const compFactory = materialsMap.get(config.name);

  config.material = compFactory();
  if (config.props) {
    config.props = reactive(config.props);
  }
  if (config.children) {
    config.children.forEach(child => {
      config2tree(child, config);
    });
  }
  return config;
}