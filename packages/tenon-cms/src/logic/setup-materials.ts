import { Image } from "@arco-design/web-vue";
import { defineComponent, h } from "vue";
import { IMaterial } from "../store/modules/materials";
const materials = new Map<string, (() => IMaterial)[]>();
const materialsMap = new Map<string, () => IMaterial>();

const componentMap = new Map<string, any>();

const dependencies = {
  Image,
}


export const setupMaterials = (store: any) => {
  const materialsRaw = import.meta.globEager('../materials/**/*.vue');
  const configRaw = import.meta.globEager('../materials/**/*.config.json');
  const viewRaw = import.meta.globEager('../materials/**/*.view.json');
  const logicRaw = import.meta.globEager('../materials/**/*.ts');
  Object.keys(materialsRaw).forEach(key => {
    const m = key.replace('../materials/', '');
    const getPath = (placeholder) => {
      return key.replace('.vue', placeholder);
    }
    const configPath = getPath('.config.json');
    const config = configRaw[configPath].default;

    const viewPath = getPath('.view.json');
    const viewConfig = viewRaw[viewPath]?.default;

    const logicPath = getPath('.ts');
    const logicConfig = logicRaw[logicPath]?.default;

    const category = m.split('/')[0];
    if (!materials.get(category)) {
      materials.set(category, []);
    }
    const comp: () => IMaterial = () => {

      const base: IMaterial = {
        name: m.split('/')[1],
        component: config.setup === 'native'
          ? materialsRaw[key].default
          : componentMap.has(config.name)
            ? componentMap.get(config.name)
            : setupComponent(viewConfig, logicConfig, config),
        config,
      };

      return base;
    };

    materials.get(category)!.push(comp);
    materialsMap.set(m.split('/')[1], comp);
  });

  store.dispatch('materials/setMaterials', materials);
  store.dispatch('materials/setMaterialsMap', materialsMap);
}


function setupComponent(view, logic, config) {
  console.log(view, logic, config);
  const comp = defineComponent({
    name: config.name,
    render: parseConfig2View(view),
    setup() {
      return {
        author: 'Doctorwu',
      }
    }
  });

  componentMap.set(config.name, comp);
  return comp;
}

function parseConfig2View(this: any, config) {
  let {
    el,
    isText = false,
    isExpression = false,
    value = '',
    props = null,
    children = []
  } = config;

  if (isText) {
    if (isExpression) {
      return this[value];
    }
    return config.value;
  }

  if (materialsMap.has(el)) {
    el = materialsMap.get(el)?.().component;
  }
  if (dependencies[el]) el = dependencies[el];
  return function (this: any, ...args) {
    return h(el, props, children.map(child => parseConfig2View.call(this, child)));
  };
}