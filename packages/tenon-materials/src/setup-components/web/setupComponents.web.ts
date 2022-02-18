import { asyncCompose, getValueByHackContext } from "@tenon/shared";
import { cloneDeep } from "lodash";
import { IMaterial, IMaterialConfig, IMaterialMeta } from "../../type";
import {
  defineComponent,
  getCurrentInstance,
  reactive, computed, ref, watchEffect,
  createTextVNode, h, Fragment,
  onMounted, onUpdated, onBeforeUnmount, onBeforeMount,
  resolveDynamicComponent,
} from "vue";
import {
  ComponentTreeNode,
  createTenonEditorComponentByMaterial,
  eventsMap, executeQueueEvents, internalSchema,
  ISchema, parseSchemas2Props, TenonComponentStates
} from "@tenon/engine";
import { setupMaterialView } from "./setupMaterialView";

const componentsMap = new Map<string, any>();
const componentsGroup = new Map<string, any[]>();
let materialDependency: any;

export const setupWebComponents = async (materials: IMaterialConfig, dependency: any) => {
  materialDependency = dependency;
  const groupNames = Object.keys(materials);
  await asyncCompose(
    groupNames.forEach.bind(groupNames),
  )(processGroup.bind(null, componentsGroup, componentsMap, materials));
  return { componentsMap, componentsGroup };
}

const processGroup = async (
  componentsGroup: Map<string, any[]>,
  componentsMap: Map<string, any>,
  materials: IMaterialConfig,
  groupName: string
) => {
  componentsGroup.set(groupName, []);
  const group = materials[groupName];
  const compNames = Object.keys(group);

  await asyncCompose(compNames.forEach.bind(compNames))(
    processComponent.bind(null, groupName, group, componentsGroup, componentsMap)
  );
}

const processComponent = async (
  groupName: string,
  group: {
    [props: string]: IMaterialMeta;
  },
  componentsGroup: Map<string, any[]>,
  componentsMap: Map<string, any>,
  compName: string,
) => {
  const materialMeta = group[compName];
  materialMeta.logic = new Function(`return ${materialMeta.logic}`)();
  materialMeta.view = setupMaterialView(materialMeta.view.children[0]);

  const {
    view,
    logic,
    doc,
    config,
  } = materialMeta;
  console.log(view);

  setupConfigSchemas(config);
  const compFactory: () => IMaterial = () => {
    const bornConfig = cloneDeep(config);
    const base: IMaterial = {
      name: compName,
      config: bornConfig,
      schemas: bornConfig.schemas,
      component: createComponent(view, logic, materialMeta),
    };
    return base;
  };
  componentsMap.set(config.name, compFactory);
  componentsGroup.get(groupName)?.push(compFactory);
}

const componentCache = new Map();

function createComponent(viewConfig, logic, material: IMaterialMeta) {
  if (componentCache.has(material.config.name)) {
    const comp = { ...componentCache.get(material.config.name) };

    return comp;
  }
  const comp = defineComponent({
    name: material.config.name,
    render: function (this: any) {
      return parseConfig2RenderFn.call(this, viewConfig, true).call(this);
    },
    inheritAttrs: false,
    props: parseSchemas2Props(material.config.schemas),
    setup: function (props, ctx) {
      return setupComponent(props, ctx, logic);
    },
  });

  componentCache.set(material.config.name, comp);
  return comp;
}


function setupComponent(props, ctx, logic) {
  const instance = getCurrentInstance();
  const tenonComp: ComponentTreeNode = (instance as any)?.ctx.$attrs.tenonComp;

  tenonComp.ctx = (instance as any)?.ctx;
  tenonComp.ctx.tenonComp = tenonComp.ctx.tenonComp || tenonComp;

  const parentComp: ComponentTreeNode | null = findParentTenonComp(instance);
  if (parentComp) {
    if (tenonComp.refKey) {
      parentComp.refs = parentComp.refs || {};
      parentComp.refs[tenonComp.refKey] = parentComp.refs[tenonComp.refKey] || tenonComp;
    }
    tenonComp.parentComponent = parentComp;
  };

  setupComponentEvents(tenonComp);

  const originStates = logic?.({
    onMounted, onUpdated, onBeforeUnmount, onBeforeMount,
    watch: watchEffect,
  }, props, ctx, tenonComp) || {};

  const handlers = reactive<string[]>([]);
  Object.keys(originStates).forEach(key => {
    if (typeof originStates[key] === "function") {
      handlers.push(key);
      eventsMap.set(`${key}_${tenonComp.id}`, originStates[key]);
    }
  });
  const tenonStates = new TenonComponentStates(originStates, tenonComp);
  const setupStates = reactive(tenonStates);

  tenonComp.states = setupStates;
  tenonComp.handlers = handlers;
  tenonComp.ctx._isTenonComp = true;

  return setupStates;
}


function setupComponentEvents(tenonComp: ComponentTreeNode) {
  if (tenonComp.events.onMounted) {
    const eventStruct = tenonComp.events["onMounted"];
    onMounted(() => {
      executeQueueEvents(eventStruct.executeQueue);
    });
  }
  if (tenonComp.events.onBeforeUnmount) {
    const eventStruct = tenonComp.events["onBeforeUnmount"];
    onBeforeUnmount(() => {
      executeQueueEvents(eventStruct.executeQueue);
    });
  }
}


export function findParentTenonComp(instance: any): ComponentTreeNode | null {
  if (!instance?.parent) return null;
  if (instance.parent.ctx._isTenonComp) return instance.parent.ctx.tenonComp;
  return findParentTenonComp(instance.parent);
}

function parseConfig2RenderFn(this: any, config, isRoot?: boolean) {
  if (typeof config === "string" || typeof config === "number") {
    config = String(config);
    config = config.trim();
    if (config.startsWith('{{') && config.endsWith('}}')) {
      return () => createTextVNode(computed(() => getValueByHackContext(this, config.slice(2, -2))).value);
    }
    return () => createTextVNode(config);
  }
  config = cloneDeep(config);
  let {
    el,
    props = {},
    children = [],
  } = config;

  if (config["<FOR>"] && !config._processedFOR) {
    const renderLoop = computed<Array<any>>(() => getValueByHackContext(this, config["<FOR>"]));

    return function _custom_for_render(this: any) {
      return h(
        Fragment,
        renderLoop.value.map(
          (item, index) => {
            const itemKey = config["<FORItemKey>"] || "item";
            const indexKey = config["<FORIndexKey>"] || "index";
            const subConfig = cloneDeep(config);
            subConfig._processedFOR = true;
            this[itemKey] = item;
            this[indexKey] = index;
            return parseConfig2RenderFn.call(this, subConfig).call(this);
          })
      );
    };
  }

  if (config["<IF>"] && !config._processedIF) {
    const renderCondition = computed(() => getValueByHackContext(this, config["<IF>"]));
    return function _custom_if_render(this: any) {
      const subConfig = cloneDeep(config);
      subConfig._processedIF = true;
      return renderCondition.value ? h(Fragment, [parseConfig2RenderFn.call(this, subConfig).call(this)]) : null;
    }
  }

  let processedProps: any = setupProps.call(this.tenonComp.ctx, props) || {};

  const Component = resolveDynamicComponent(el);
  if (typeof Component !== "string") {

    el = Component;
    if (config.refKey) {
      props.ref = props.ref || {};
      props.ref[config.refKey] = ref();
    }
  }
  else if (materialDependency[el]) el = materialDependency[el];

  if (componentsMap.has(el)) {
    const compFactory = componentsMap.get(el);
    if (compFactory) {
      const material = compFactory();
      const source = cloneDeep(processedProps);
      const tenonComp = createTenonEditorComponentByMaterial(material, null, {
        isSlot: !!source.isSlot,
        props: source
      });
      if (el !== "Compose-View" || !source.isSlot) {
        processedProps = {
          tenonComp,
          ...tenonComp.props
        };
      }
      tenonComp.refKey = config.refKey;
      el = material.component;
    }
  }

  const rootRef = ref(null);
  processedProps["ref"] = rootRef;

  return function _custom_render(this: any) {
    const defaultArray: any[] = [];
    const injectChildren: any = {
      default: () => defaultArray,
    };

    children.forEach(child => {
      const { isSlot, slotKey } = child;
      if (isSlot) {
        const slotConfig = child;
        if (slotKey === "default") {
          defaultArray.push(parseConfig2RenderFn.call(this, slotConfig).call(this));
        } else {
          const vNode = parseConfig2RenderFn.call(this, slotConfig).call(this);
          if (vNode) {
            (injectChildren[slotKey] = () => vNode);
          } else {
            delete injectChildren[slotKey];
          }
        }
      }
      else
        defaultArray.push(parseConfig2RenderFn.call(this, child).call(this));
    });

    const VNode = h(el, processedProps, injectChildren);
    if (isRoot) {
      VNode.props = VNode.props || {};
      if (VNode.props?.onVnodeMounted) {
        if (!(VNode.props?.onVnodeMounted instanceof Array)) {
          VNode.props.onVnodeMounted = [VNode.props?.onVnodeMounted];
        }
      } else {
        VNode.props.onVnodeMounted = [];
      }
      const instance = getCurrentInstance();
      VNode.props?.onVnodeMounted.push(() => {
        if ((instance as any).ctx.tenonComp && (VNode?.props?.ref as any).value) {
          (instance as any).ctx.tenonComp.refs['$rootRef'] = (VNode?.props?.ref as any).value;
        }
      });
    } else if (config.refKey) {
      VNode.props = VNode.props || {};
      if (VNode.props?.onVnodeMounted) {
        if (!(VNode.props?.onVnodeMounted instanceof Array)) {
          VNode.props.onVnodeMounted = [VNode.props?.onVnodeMounted];
        }
      } else {
        VNode.props.onVnodeMounted = [];
      }
      const instance = getCurrentInstance();
      VNode.props?.onVnodeMounted.push(() => {
        if ((instance as any).ctx.tenonComp && (VNode?.props?.ref as any).value) {
          (instance as any).ctx.tenonComp.refs[config.refKey] = (instance as any).ctx.tenonComp.refs[config.refKey] || [];
          (instance as any).ctx.tenonComp.refs[config.refKey].push((VNode?.props?.ref as any).value);
        }
      });
    }
    return VNode;
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
    injectDynamicPropsValue.call(this, props, key);
  });

  Object.keys(props).forEach(key => {
    key = key.trim();
    let value = props[key];
    switch (key) {
      case "style":
        if (typeof value === "string") {
          newProps[key] = recursiveGetValue(this, value);
        } else if (typeof value === "object") {
          newProps["style"] = value;
        }
        break;
      case "t-bind":
        value = value instanceof Array ? value : [value];
        value.forEach(val => {
          const bindings = props[val] || this[val] || {};
          Object.keys(bindings).forEach((bindingKey) => {
            newProps[bindingKey] = bindings[bindingKey];
          });
        });
        break;
      default:
        newProps[key] = value;
        break;
    }
  });
  return newProps;
}

function injectDynamicPropsValue(this: any, value: any, key: string) {
  if (!value[key]) return;
  const type = typeof value[key];
  switch (type) {
    case "object":
      Object.keys(value[key]).forEach(subKey => {
        injectDynamicPropsValue.call(this, value[key], subKey);
      });
      break;
    case "string":
      if (value[key].startsWith("{{") && value[key].endsWith("}}")) {
        value[key] = getValueByHackContext(this, value[key].slice(2, -2))
      }
      break;
    default:
      break;
  }
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
      case 'custom':
        return schema;
      case 'internal':
        const specSchema = Object.assign({}, internalSchema[key]);
        if (!specSchema) return schema;
        specSchema.title = title;
        specSchema.fieldName = fieldName;
        return specSchema;
      default:
        return schema;
    }
  });
  config.schemas?.push(internalSchema.containerLayout);
  config.schemas?.push(internalSchema.containerBackground);
}