import { getComponentsApi } from '@/api';
import { materialDependency } from '@/logic/material-dependency';
import { createStore, Store } from 'vuex';
import { IMaterial, setupWebComponents } from "@tenon/materials";
import { cloneDeep } from 'lodash';
import ComposeViewConfig from "../components/editor/viewer/Compose-View/Compose-View.config.json";
import ComposeViewVue from '@/components/editor/viewer/Compose-View/Compose-View.vue';

export interface IRootState {
  author: string;
}
let store: Store<IRootState>;

const rawModules = import.meta.globEager('./modules/*.ts');
const modules = {};
setupModules(modules, rawModules);

export const setupStore = (app) => {
  // 创建一个新的 store 实例
  store = createStore({
    state(): IRootState {
      return {
        author: 'Doctor wu',
      }
    },
    mutations: {},
    actions: {},
    getters: {
      author(state) {
        return state.author;
      }
    },
    modules,
  });

  // 将 store 实例作为插件安装
  app.use(store);

  // setupMaterials(store);
  (async () => {
    const components = await (await getComponentsApi()).data;
    const {
      componentsMap,
      componentsGroup,
    } = await setupWebComponents(components, materialDependency);
    console.log(componentsMap);
    console.log(componentsGroup);

  
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
  })();
};

export const useStore = () => store;

function setupModules(modules, rawModules) {
  for (const rawModuleKey of Reflect.ownKeys(rawModules)) {
    const moduleName = /\.\/modules\/([a-zA-Z-_0-9]+)\.ts/.exec(rawModuleKey as string)?.[1];
    if (!moduleName) {
      console.warn(`Module name <${rawModuleKey as string}> is not valid`);
      continue;
    }
    modules[moduleName] = rawModules[rawModuleKey].default;
  }
}