import { getComponentsApi } from "@/api";
import { IRootState } from "@/store";
import { currPageInfo } from "@/store/modules/page";
import { IMaterial, setupConfigSchemas, setupWebComponents } from "@tenon/materials";
import { Store } from "vuex";
import { materialDependency } from "@tenon/internal-components";
import ComposeViewConfig from "@/components/editor/viewer/Compose-View/Compose-View.config.json";
import ComposeViewVue from '@/components/editor/viewer/Compose-View/Compose-View.vue';
import { cloneDeep } from "lodash";
import { ISchema, TenonComponent, TenonPropsBinding } from "@tenon/engine";
import { watchEffect } from "vue";
import { editMode } from "./viewer-status";
import { Message } from "@arco-design/web-vue";


let initd = false;
export const setupMaterials = async (store: Store<IRootState>) => {
  if (initd) return;
  console.log(materialDependency);

  TenonComponent.editMode = editMode;

  initd = true;
  const components = await (await getComponentsApi()).data;
  const {
    componentsMap,
    componentsGroup,
  } = await setupWebComponents(components, materialDependency);
  console.log(componentsMap);
  console.log(componentsGroup);


  setupConfigSchemas(ComposeViewConfig);
  const composeView = () => {
    const bornConfig = cloneDeep(ComposeViewConfig);
    const base: IMaterial = {
      name: "Compose-View",
      config: bornConfig,
      schemas: bornConfig.schemas as ISchema<"internal">[],
      component: ComposeViewVue,
    };
    return base;
  };
  componentsMap.set("Compose-View", composeView);
  componentsGroup.get("Base")?.unshift(composeView);

  store.dispatch('materials/setMaterials', componentsGroup);
  store.dispatch('materials/setMaterialsMap', componentsMap);
  const defaultTree = new TenonComponent(composeView(), {});
  store.dispatch('viewer/setTree', cloneDeep(defaultTree));
  store.dispatch('viewer/setDefaultTree', defaultTree);

  TenonComponent.materialsMap = componentsMap;

  TenonComponent.customConfig.getPageStates = async () => {
    const pageInfo = await store.getters['page/getPageInfo'];
    const pageStates = pageInfo.pageStates;
    return pageStates;
  }

  TenonComponent._exec = (instance, expression: string, ...args: any[]) => {
    let executeEvent = args[0] === '__tenon-event__';
    try {
      const pageInfo = (store.state as any).page.pageInfo;
      // debugger; 
      const handler = executeEvent
        ? new Function('injectMeta', `
        const {$comp, $pageStates, $redirect, $args, _editMode} = injectMeta;
        try {
          ${expression}
        } catch(e) {
          console.error(e);
          return '';
        }
      `)
        : new Function('injectMeta', `
        const {$comp, $pageStates, $redirect, $args, _editMode} = injectMeta;
        try {
          return ${expression};
        } catch(e) {
          console.error(e);
          return '';
        }
      `);
      const injectMeta = {
        $comp: instance,
        $pageStates: pageInfo.pageStates,
        $redirect: (...args) => Message.success(`redirect to ${args[0]}`),
        $args: executeEvent ? args.slice(1) : args,
        _editMode: editMode,
      };
      handler(injectMeta);
    } catch (e) {
      console.error(expression);

      console.error(e);
    }
  }


  TenonPropsBinding.staticHook.afterAddingBinding((instance: TenonComponent, fieldName, propsKey, expression) => {
    if (!TenonPropsBinding.trackingBinding) return;
    const trigger = async () => {
      // console.log(instance, fieldName, propsKey, expression);
      if (instance.runtimeBinding[instance.propsBinding.makeKey(fieldName, propsKey)]) {
        instance.runtimeBinding[instance.propsBinding.makeKey(fieldName, propsKey)]();
      }
      const pageInfo = await store.getters['page/getPageInfo'];
      try {
        const handler = new Function('injectMeta', `
        const {
          $comp,
          $pageStates,
          _editMode,
        } = injectMeta;
        try {
          return ${expression};
        } catch(e) {
          console.error(e);
          return '';
        }
      `);
        const injectMeta = {
          $comp: instance,
          $pageStates: pageInfo.pageStates,
          _editMode: editMode,
        };
        const cancel = watchEffect(() => {
          if (!TenonPropsBinding.trackingBinding) return;
          try {
            instance.props[fieldName][propsKey] = handler(injectMeta);
          } catch (e) {
            // Message.error(`[Expression Error]: ${e}`);
            console.error(e);
          }
        }, {
          flush: 'post'
        });
        instance.runtimeBinding[instance.propsBinding.makeKey(fieldName, propsKey)] = cancel;
      } catch (e) {
        console.error(e);
        // debugger;
      }
    };
    if (instance.mounted) {
      trigger();
    } else {
      instance.lifecycleHook.onMounted(trigger);
    }
  });
}