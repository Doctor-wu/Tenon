import { Image, Card, Grid, Button } from "@arco-design/web-vue";
import {
  createTextVNode,
  defineComponent, h,
  onMounted, onUpdated,
  onBeforeUnmount, onBeforeMount,
  reactive,
  getCurrentInstance,
  computed,
  ref,
  watchEffect
} from "vue";
import { internalSchema } from "../schemas";
import { IMaterialConfig } from "../store/modules/materials";
import { ISchema, parseSchemas2Props } from "./schema";
import { MaterialComponentContext } from "./setup-component-context";
import { getValueByInjectContext } from "@tenon/shared"
import { createTenonEditorComponentByMaterial } from "./tree-operation";
import TenonCompContainer from "../components/tenon-comp-container.vue";
import _ from "lodash";

const materials = new Map<string, (() => IMaterialConfig)[]>();
const materialsMap = new Map<string, () => IMaterialConfig>();
const componentMap = new Map<string, any>();
const dependencies = {
  Image,
  Card,
  GridCol: Grid.Col,
  GridRow: Grid.Row,
  Button,
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
    const compFactory: () => IMaterialConfig = () => {
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

    materials.get(categoryKey)!.push(compFactory);
    materialsMap.set(compName, compFactory);
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
      // MaterialComponentContext.value = this;
      return parseConfig2RenderFn.call(this, viewConfig).call(this);
    },
    inheritAttrs: false,
    props: parseSchemas2Props(material.config.schemas),
    setup: function (props, ctx) { 
      const instance = getCurrentInstance();
      MaterialComponentContext.value = (instance as any)?.ctx;
      return setupComponent(props, ctx, logic);
    },
  });
  comp.__material = material;

  componentMap.set(material.config.name, comp);
  return comp;
}

function setupComponent(props, ctx, logic) {
  const instance = getCurrentInstance();

  const states = reactive(logic?.({
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount,
    watch: watchEffect,
  }, props, ctx, instance) || {});
  const material = (instance as any)?.ctx.$options.__material;
  if (material.tenonComp) {
    material.tenonComp.states = states;
  }

  return states;
}

function parseConfig2RenderFn(this: any, config) {
  if (typeof config === "string" || typeof config === "number") {
    config = String(config);
    config = config.trim();
    if (config.startsWith('{{') && config.endsWith('}}')) {
      return () => createTextVNode(recursiveGetValue(this, config.slice(2, -2)));
    }
    return () => createTextVNode(config);
  }

  let {
    el,
    props = {},
    children = [],
    slots = {},
  } = config;

  let processedProps: any = setupProps.call(this, props) || {};

  if (dependencies[el]) el = dependencies[el];

  if (materialsMap.has(el)) {
    const compFactory = materialsMap.get(el);
    if (compFactory) {
      // if (el === 'Compose-View') {
      //   const material = compFactory();
      //   el = material.component;
      // } else {
      //   const material = compFactory();
      //   const comp = createTenonEditorComponentByMaterial(material, null, { props: processedProps });
      //   comp.props = processedProps;
      //   processedProps = { config: comp };
      //   // el = TenonCompContainer;
      //   el = material.component
      // }
      const material = compFactory();
      el = material.component;
    }
  }

  return function _custom_render(this: any) {
    const defaultArray: any[] = [];
    const injectChildren: any = {
      default: () => defaultArray,
    };

    children.forEach(child => {
      let renderCondition = ref(true);
      if (child["<IF>"]) {
        renderCondition = computed(() => getValueByInjectContext(this, child["<IF>"]));
      }
      defaultArray.push(renderCondition.value ? parseConfig2RenderFn.call(this, child).call(this) : null);
    });

    Object.keys(slots).forEach(slotKey => {
      const slotConfig = slots[slotKey];
      let renderCondition = ref(true);
      if (slotConfig["<IF>"]) {
        renderCondition = computed(() => getValueByInjectContext(this, slotConfig["<IF>"]));
      }
      if (slotKey === "default") {
        defaultArray.push(renderCondition.value ? parseConfig2RenderFn.call(this, slotConfig).call(this) : undefined);
      } else {
        (injectChildren[slotKey] = () => renderCondition.value ? parseConfig2RenderFn.call(this, slotConfig).call(this) : undefined);
      }
    })

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
    let value = props[key];
    switch (key) {
      case "style":
        newProps[key] = recursiveGetValue(this, value);
        break;
      case "<BINDING>":
        const bindings = props[value] || this[value] ||{};
        Object.keys(bindings).forEach((bindingKey) => {
          newProps[bindingKey] = bindings[bindingKey];
        });
        break;
      default:
        newProps[key] =  value;
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
      default:
        break;
    }
  });
  config.schemas?.push(internalSchema.containerLayout);
  config.schemas?.push(internalSchema.containerBackground);
  // config.schemas?.push(internalSchema.textStyle);
}
