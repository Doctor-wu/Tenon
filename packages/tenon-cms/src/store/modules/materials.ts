import { Module } from 'vuex';
import { IRootState } from '..';


const materialsRaw = import.meta.globEager('../../materials/**/*.vue');
const configRaw = import.meta.globEager('../../materials/**/*.config.json');
const materials = new Map<string, IMaterial[]>();
const materialsMap = new Map<string, IMaterial>();
Object.keys(materialsRaw).forEach(key => {
  const m = key.replace('../../materials/', '');
  const configPath = key.replace('.vue', '.config.json');
  const config = configRaw[configPath].default;
  console.log(config);

  const category = m.split('/')[0];
  if (!materials.get(category)) {
    materials.set(category, []);
  }
  const comp: IMaterial = {
    name: m.split('/')[1],
    component: materialsRaw[key].default,
    config,
  };
  materials.get(category)!.push(comp);
  materialsMap.set(m.split('/')[1], comp);
});

export interface IMaterial {
  name: string;
  component: any;
  config: any;
}

export interface IMaterialsState {
  materials: [
    string,
    IMaterial[]
  ][];
  materialsMap: Map<string, IMaterial>;
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