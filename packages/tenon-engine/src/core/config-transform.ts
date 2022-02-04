import { cloneDeep } from "lodash";
import { DEFAULT_EVENTS, createPropsBySchemas, ComponentTreeNode } from "@tenon/engine";

export const tree2config = ({ toRaw, reactive }) => (config: ComponentTreeNode) => {
  let newConfig: any = {};
  const extractKey = [
    'parent',
    'children',
    'material',
    'props',
    'slots',
    'states',
    'ctx',
    'subComponents',
    'refs',
    'schemas',
    'events',
    'handlers',
    'parentComponent',
  ]
  for (let key in config) {
    if (extractKey.includes(key)) continue;
    newConfig[key] = config[key];
  }
  if (config.props) {
    newConfig.props = { ...toRaw(config.props) };
  }
  if (config.schemas) {
    newConfig.schemas = toRaw(config.schemas);
  }
  if (config.children) {
    newConfig.children = config.children.map(child => {
      return tree2config({ toRaw, reactive })(child);
    });
  }
  if (config.slots) {
    const oldSlots = toRaw(config.slots);
    newConfig.slots = {};
    Object.keys(oldSlots).forEach(key => {
      newConfig.slots[key] = tree2config({ toRaw, reactive })(oldSlots?.[key] || {});
    });
  }
  if (config.events) {
    newConfig.events = toRaw(config.events);
  }
  return newConfig;
};

export const config2tree = ({ reactive, materialsMap }) => (config: any, sup?: any): ComponentTreeNode => {
  if (sup) {
    config.parent = sup;
  }
  const compFactory = materialsMap.get(config.name);

  config.material = compFactory();
  config.material.tenonComp = config;

  if (config.props) {
    const materialProps = createPropsBySchemas(materialsMap.get(config.name)?.().schemas);
    Object.keys(materialProps).forEach(key => {
      if (!config.props[key]) config.props[key] = materialProps[key];
    });
    config.props = reactive(config.props);
  }
  if (config.children) {
    config.children.forEach(child => {
      config2tree({ materialsMap, reactive })(child, config);
    });
  }
  if (config.slots) {
    let newSlots = {};
    Object.keys(config.slots).forEach(key => {
      newSlots[key] = config2tree({ materialsMap, reactive })(config.slots[key]);
    });
    config.slots = newSlots;
  }
  if (config.states) {
    config.states = reactive(config.states);
  } else {
    config.states = reactive({});
  }


  config.subComponents = {};
  config.refs = {};
  config.events = config.events || cloneDeep(DEFAULT_EVENTS);

  return config;
}