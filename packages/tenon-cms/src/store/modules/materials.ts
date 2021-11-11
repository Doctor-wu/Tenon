import { Module } from 'vuex';
import { IRootState } from '..';
import composeViewComp from '../../components/viewer/compose-view.vue';


const materialsRaw = import.meta.globEager('../../materials/**/*.vue');
const configRaw = import.meta.globEager('../../materials/**/*.config.json');
const materials = new Map<string, (() => IMaterial)[]>();
const materialsMap = new Map<string, () => IMaterial>();
Object.keys(materialsRaw).forEach(key => {
  const m = key.replace('../../materials/', '');
  const configPath = key.replace('.vue', '.config.json');
  const config = configRaw[configPath].default;

  const category = m.split('/')[0];
  if (!materials.get(category)) {
    materials.set(category, []);
  }
  const comp: () => IMaterial = () => ({
    name: m.split('/')[1],
    component: materialsRaw[key].default,
    config: {
      ...config,
    },
  });
  materials.get(category)!.push(comp);
  materialsMap.set(m.split('/')[1], comp);
});
const composeView = () => ({
  name: 'Compose-View',
  component: composeViewComp,
  config: {
    name: 'Compose-View',
    description: [
      "Compose-View 是一个<基础组件>，Compose-View提供拖拽, 提示，以及组件的嵌套功能, Compose-View是最小的嵌套单位"
      + "部分编辑功能仅在编辑模式生效"
    ],
    icon: 'code-sandbox',
    nestable: true,
  },
  children: [],
});
materials.get('base')?.unshift(composeView);
materialsMap.set('Compose-View', composeView);

export interface IMaterial {
  name: string;
  component: any;
  config: any;
}

export interface IMaterialsState {
  materials: [
    string,
    (() => IMaterial)[]
  ][];
  materialsMap: Map<string, () => IMaterial>;
}

export default {
  state() {
    return {
      materials: [...materials],
      materialsMap: materialsMap,
    };
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    getMaterials(state: IMaterialsState) {
      return state.materials;
    },
    getMaterialsMap(state: IMaterialsState) {
      return state.materialsMap;
    },
  },
  namespaced: true,
} as Module<IMaterialsState, IRootState>;