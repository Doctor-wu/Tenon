import { createStore, Store } from 'vuex'
import { setupMaterials } from '../logic/setup-materials';

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

  setupMaterials(store);
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