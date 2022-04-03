import { getComponentsApi } from "@/api";
import { IRootState } from "@/store";
import { IMaterial, setupConfigSchemas, setupWebComponents } from "@tenon/materials";
import { Store } from "vuex";
import { materialDependency } from "@tenon/internal-components";
import ComposeViewConfig from "@/components/editor/viewer/Compose-View/Compose-View.config.json";
import ComposeViewVue from '@/components/editor/viewer/Compose-View/Compose-View.vue';
import { cloneDeep } from "lodash";
import { ISchema, TenonComponent } from "@tenon/engine";
import { watchEffect } from "vue";
import { Message } from "@arco-design/web-vue";


let initd = false;
export const setupMaterials = async (store: Store<IRootState>) => {
  // if (initd) return;
  console.log(materialDependency);

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


  TenonComponent.staticHook.afterDeserialize((instance: TenonComponent) => {
    if (instance.propsBinding._bindings.size > 0) {
      instance.lifecycleHook.onMounted(() => {
        Array.from(instance.propsBinding._bindings.keys()).forEach(key => {
          const [fieldName, propsKey] = key.split('@');
          const expression = instance.propsBinding.getBinding(fieldName, propsKey);
          console.log(instance, fieldName, propsKey, expression);

          const trigger = new Function('injectMeta', `
            const {
              $comp,
            } = injectMeta;
            return ${expression};
          `);
          const cancel = watchEffect(() => {
            try {
              instance.props[fieldName][propsKey] = trigger({
                $comp: instance,
              });
            } catch (e) {
              Message.error(`[Expression Error]: ${e}`);
            }
          });
          instance.runtimeBinding[instance.propsBinding.makeKey(fieldName, propsKey)] = cancel;
        });
      });
    }
  });
}