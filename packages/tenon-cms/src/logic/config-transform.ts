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
    'slots'
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
  if (config.slots) {
    newConfig.slots = {};
    Object.keys(config.slots).forEach(key => {
      newConfig.slots[key] = tree2config(config.slots?.[key] || {});
    });
  }
  console.log(newConfig);

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
  if (config.slots) {
    let newSlots = {};
    Object.keys(config.slots).forEach(key => {
      newSlots[key] = config2tree(config.slots[key]);
    });
    config.slots = newSlots;
  }
  return config;
}