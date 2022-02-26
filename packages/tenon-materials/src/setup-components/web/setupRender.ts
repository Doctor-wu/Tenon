import { ComponentTreeNode, createTenonComponent } from "@tenon/engine";
import { getValueByHackContext } from "@tenon/shared";
import { cloneDeep } from "lodash";
import { computed, createTextVNode, Fragment, getCurrentInstance, h, ref, resolveDynamicComponent } from "vue";
import { componentsMap, materialDependency } from "./setupComponents.web";
import { setupProps } from "./setupProps";


export function findParentTenonComp(instance: any): ComponentTreeNode | null {
  if (!instance?.parent) return null;
  if (instance.parent.ctx._isTenonComp) return instance.parent.ctx.tenonComp;
  return findParentTenonComp(instance.parent);
}


export function parseConfig2RenderFn(this: any, config, isRoot?: boolean) {
  if (typeof config === "string" || typeof config === "number") {
    config = String(config);
    config = config.trim();
    if (config.startsWith('{{') && config.endsWith('}}')) {
      return () => createTextVNode(computed(() => getValueByHackContext(this, config.slice(2, -2))).value);
    }
    return () => createTextVNode(config);
  }
  // config = cloneDeep(config);
  let {
    el,
    props = {},
    children = [],
  } = config;

  if (props["t-for"] && !config._processedFOR) {

    const renderLoop = computed<Array<any>>(() => getValueByHackContext(this, props["t-for"]));

    return function _custom_for_render(this: any) {
      return h(
        Fragment,
        renderLoop.value.map(
          (item, index) => {
            const itemKey = config["t-for-item"] || "item";
            const indexKey = config["t-for-index"] || "index";
            const subConfig = cloneDeep(config);
            subConfig._processedFOR = true;
            this[itemKey] = item;
            this[indexKey] = index;
            return parseConfig2RenderFn.call(this, subConfig).call(this);
          })
      );
    };
  }

  if (props["t-if"] && !config._processedIF) {
    const renderCondition = computed(() => getValueByHackContext(this, props["t-if"]));
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
      const tenonComp = createTenonComponent(material, null, {
        isSlot: !!source.props?.isSlot,
        props: source
      });
      if (el !== "Compose-View" || !source.props?.isSlot) {
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
      const isSlot = child.props?.["t-slot"] !== undefined;
      const slotKey = child.props?.["t-slot"] || "default";
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