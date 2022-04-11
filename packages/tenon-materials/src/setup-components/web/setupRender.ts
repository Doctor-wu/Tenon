import { ComponentTreeNode, createTenonComponent, TenonComponent } from "@tenon/engine";
import { getValueByHackContext } from "@tenon/shared";
import { cloneDeep } from "lodash";
import { computed, createTextVNode, Fragment, getCurrentInstance, h, reactive, ref, resolveDynamicComponent, withScopeId } from "vue";
import { componentsMap, materialDependency } from "./setupComponents.web";
import { setupComponentEvents } from "./setupEvents";
import { setupProps } from "./setupProps";


export function findParentTenonComp(instance: any): TenonComponent | null {
  if (!instance?.parent) return null;
  if (instance.parent.ctx._isTenonComp) return instance.parent.ctx.tenonComp;
  return findParentTenonComp(instance.parent);
}


export function parseConfig2RenderFn(this: any, config) {
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

  if (props["_scopeSlotArgs"]) {
    processedProps.tenonCompProps.scopeSlotArgs = props["_scopeSlotArgs"];
    if (this.tenonComp) {
      this.tenonComp.tenonCompProps.scopeSlotArgs = props["_scopeSlotArgs"];
    }
  }

  if (processedProps.ref && this.tenonComp) {
    this.tenonComp.refs[processedProps.ref] = this.tenonComp.ctx.$.setupState[processedProps.ref] = ref();
  }

  const Component = resolveDynamicComponent(el);
  if (typeof Component !== "string") {
    el = Component;
  }
  else if (materialDependency[el]) el = materialDependency[el];

  if (componentsMap.has(el)) {
    const compFactory = componentsMap.get(el);
    if (compFactory) {
      const material = compFactory();
      const source = cloneDeep(processedProps);
      const tenonComp = createTenonComponent(material, undefined, {
        isSlot: !!source.props?.isSlot,
        props: source,
      });
      if (el !== "Compose-View" || !source.isSlot) {
        processedProps = {
          tenonComp,
          ...tenonComp.props
        };
      }
      el = material.component;
    }
  }

  function _custom_render(this: any) {
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
          injectChildren[slotKey] =
            (scope) => {
              if (scope && Object.keys(scope).length) {
                slotConfig.props = slotConfig.props || {};
                slotConfig.props['_scopeSlotArgs'] = scope;
              }
              return parseConfig2RenderFn.call(this, slotConfig).call(this);
            }
        }
      }
      else
        defaultArray.push(parseConfig2RenderFn.call(this, child).call(this));
    });

    setupComponentEvents(this.tenonComp, processedProps);

    return h(el, processedProps, injectChildren);
  };

  return _custom_render;
}