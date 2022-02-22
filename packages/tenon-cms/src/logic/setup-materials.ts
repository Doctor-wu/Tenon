import { getComponentsApi } from "@/api";
import { IRootState } from "@/store";
import { IMaterial, setupConfigSchemas, setupWebComponents } from "@tenon/materials";
import { Store } from "vuex";
import { materialDependency } from "./material-dependency";
import ComposeViewConfig from "@/components/editor/viewer/Compose-View/Compose-View.config.json";
import ComposeViewVue from '@/components/editor/viewer/Compose-View/Compose-View.vue';
import { cloneDeep } from "lodash";

export const setupMaterials = async (store: Store<IRootState>) => {
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
      schemas: bornConfig.schemas,
      component: ComposeViewVue,
    };
    return base;
  };
  componentsMap.set("Compose-View", composeView);
  componentsGroup.get("base")?.unshift(composeView);

  store.dispatch('materials/setMaterials', componentsGroup);
  store.dispatch('materials/setMaterialsMap', componentsMap);
}