import { Image } from "@arco-design/web-vue";
import { createTextVNode, defineComponent, h } from "vue";
import { IMaterial } from "../store/modules/materials";
const materials = new Map<string, (() => IMaterial)[]>();
const materialsMap = new Map<string, () => IMaterial>();

const componentMap = new Map<string, any>();

const dependencies = {
  Image,
}


export const setupMaterials = (store: any) => {
  const vueRaw = import.meta.globEager('../materials/**/*.vue');
  const configRaw = import.meta.globEager('../materials/**/*.config.json');
  const viewRaw = import.meta.globEager('../materials/**/*.view.json');
  const logicRaw = import.meta.globEager('../materials/**/*.ts');
  Object.keys(configRaw).forEach(key => {
    const extractPrefixName = key.replace('../materials/', '');
    const categoryKey = extractPrefixName.split('/')[0];
    const compName = extractPrefixName.split('/')[1];

    const getPath = (placeholder) => {
      return key.replace('.config.json', placeholder);
    }
    const config = configRaw[key];
    const vuePath = getPath('.vue');
    const vueConfig = vueRaw?.[vuePath]?.default;

    const viewPath = getPath('.view.json');
    const viewConfig = viewRaw[viewPath]?.default;

    const logicPath = getPath('.ts');
    const logicConfig = logicRaw[logicPath]?.default;

    if (!materials.get(categoryKey)) {
      materials.set(categoryKey, []);
    }
    const comp: () => IMaterial = () => {

      const base: IMaterial = {
        name: compName,
        component: config.setup === 'native'
          ? vueConfig
          : componentMap.has(config.name)
            ? componentMap.get(config.name)
            : setupComponent(viewConfig, logicConfig, config),
        config,
      };

      return base;
    };
    console.log(comp);

    materials.get(categoryKey)!.push(comp);
    materialsMap.set(compName, comp);
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
      return () => createTextVNode(this[value]);
    }
    return () => createTextVNode(config.value);
  }

  if (dependencies[el]) el = dependencies[el];

  if (materialsMap.has(el)) {
    el = materialsMap.get(el)?.().component;
  }
  return function _custom_render(this: any, ...args) {
    return h(el, props, {
      default: () => children.map(child => parseConfig2View.call(this, child)()),
    });
  };
}