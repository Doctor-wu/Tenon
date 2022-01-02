import { Image, Card } from "@arco-design/web-vue";
import {
  createTextVNode,
  defineComponent, h,
  onMounted, onUpdated,
  onBeforeUnmount, onBeforeMount,
  reactive,
  getCurrentInstance,
} from "vue";
import { internalSchema } from "../schemas";
import { IMaterialConfig } from "../store/modules/materials";
import { ISchema, parseSchemas2Props } from "./schema";
import { MaterialComponentContext } from "./setup-component-context";
import { createTenonEditorComponentByMaterial } from "./tree-operation";

const materials = new Map<string, (() => IMaterialConfig)[]>();
const materialsMap = new Map<string, () => IMaterialConfig>();
const componentMap = new Map<string, any>();
const dependencies = {
  Image,
  Card,
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
    const config = configRaw[key].default;

    const vuePath = getPath('.vue');
    const vueConfig = vueRaw?.[vuePath]?.default;

    const viewPath = getPath('.view.json');
    const viewConfig = viewRaw[viewPath]?.default;

    const logicPath = getPath('.ts');
    const logicConfig = logicRaw[logicPath]?.default;

    if (!materials.get(categoryKey)) {
      materials.set(categoryKey, []);
    }

    setupConfigSchemas(config);
    const comp: () => IMaterialConfig = () => {
      const base: IMaterialConfig = {
        name: compName,
        config,
        schemas: config.schemas,
        component: {},
      };

      base.component = config.setup === 'native'
        ? vueConfig
        : createComponent(viewConfig, logicConfig, base);

      return base;
    };

    materials.get(categoryKey)!.push(comp);
    materialsMap.set(compName, comp);
  });

  store.dispatch('materials/setMaterials', materials);
  store.dispatch('materials/setMaterialsMap', materialsMap);
}


function createComponent(viewConfig, logic, material: IMaterialConfig) {
  if (componentMap.has(material.config.name)) {
    const comp = { ...componentMap.get(material.config.name) };
    comp.__material = material;

    return comp;
  }
  const comp = defineComponent({
    name: material.config.name,
    render: function (this: any) {
      MaterialComponentContext.value = this;
      return parseConfig2RenderFn.call(this, viewConfig).call(this);
    },
    inheritAttrs: false,
    props: parseSchemas2Props(material.config.schemas),
    setup: function (props, ctx) { return setupComponent(props, ctx, logic) },
  });

  componentMap.set(material.config.name, comp);
  return comp;
}

function setupComponent(props, ctx, logic) {
  const instance = getCurrentInstance();

  const states = reactive(logic?.({
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount
  }, props, ctx) || {});
  const material = (instance as any)?.ctx.$options.__material;
  material.tenonComp.states = states;

  return states;
}

function parseConfig2RenderFn(this: any, config) {
  if (typeof config === 'string') {
    config = config.trim();
    if (config.startsWith('{{') && config.endsWith('}}')) {
      return () => createTextVNode(recursiveGetValue(this, config.slice(2, -2)));
    }
    return () => createTextVNode(config);
  }

  let {
    el,
    slotKey = "default",
    props = {},
    children = []
  } = config;

  if (dependencies[el]) el = dependencies[el];

  if (materialsMap.has(el)) {
    const compFactory = materialsMap.get(el);
    const material = compFactory?.();
    el = material?.component;
  }

  const processedProps: any = setupProps.call(this, props) || {};

  return function _custom_render(this: any) {
    const defaultArray:any[] = [];
    const injectChildren:any = {
      default: () => defaultArray,
    };

    children.forEach(child => {
      if (!child.slotKey) {
        defaultArray.push(parseConfig2RenderFn.call(this, child).call(this));
      } else {
        injectChildren[child.slotKey]= () => parseConfig2RenderFn.call(this, child).call(this);
      }
    });

    return h(el, processedProps, injectChildren);
  };
}

function recursiveGetValue(obj: any, path: string) {
  if (!obj) return;
  if (path.includes('.')) {
    const [key, ...rest] = path.split('.');
    return recursiveGetValue(obj[key], rest.join('.'));
  }
  return obj[path];
}

function setupProps(this: any, props = {}) {
  const newProps = {};
  Object.keys(props).forEach(key => {
    key = key.trim();
    const value = props[key];
    switch (key) {
      case 'style':
        newProps[key] = recursiveGetValue(this, value);
        break;
      case '<BINDING>':
        const bindings = this[value] || {};
        Object.keys(bindings).forEach((bindingKey) => {
          newProps[bindingKey] = bindings[bindingKey];
        });
        break;
      default:
        newProps[key] = value;
        break;
    }
  });
  return newProps;
}

function setupConfigSchemas(config) {
  const {
    schemas = [],
  } = config;
  config.schemas = schemas.map((schema: ISchema) => {
    const {
      type,
      key = "",
      title,
      fieldName,
    } = schema;
    switch (type) {
      case 'object':
        return schema;
      case 'internal':
        const specSchema = Object.assign({}, internalSchema[key]);
        if (!specSchema) return schema;
        specSchema.title = title;
        specSchema.fieldName = fieldName;
        return specSchema;
        break;
      default:
        break;
    }
  });
  config.schemas?.push(internalSchema.containerLayout);
  config.schemas?.push(internalSchema.containerBackground);
  // config.schemas?.push(internalSchema.textStyle);
}