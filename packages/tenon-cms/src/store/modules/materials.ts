import { Module } from 'vuex';
import { IRootState } from '..';
import { ISchema } from '../../logic/schema';

export interface IMaterial {
  name: string;
  component: any;
  config: any;
  schemas?: ISchema[];
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
      materials: [],
      materialsMap: new Map(),
    };
  },
  mutations: {
    SET_MATERIALS(state, materials) {
      state.materials = materials;
    },
    SET_MATERIALS_MAP(state, materialsMap) {
      state.materialsMap = materialsMap;
    }
  },
  actions: {
    setMaterials({ commit }, materials) {
      commit('SET_MATERIALS', materials);
    },
    setMaterialsMap({ commit }, materialsMap) {
      commit('SET_MATERIALS_MAP', materialsMap);
    }
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
