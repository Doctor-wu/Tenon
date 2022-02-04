import { Module } from 'vuex';
import { IRootState } from '..';
import { ISchema, ComponentTreeNode, IMaterialConfig } from '@tenon/engine';


export interface IMaterialConfigsState {
  materials: [
    string,
    (() => IMaterialConfig)[]
  ][];
  materialsMap: Map<string, () => IMaterialConfig>;
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
    getMaterials(state: IMaterialConfigsState) {
      return state.materials;
    },
    getMaterialsMap(state: IMaterialConfigsState) {
      return state.materialsMap;
    },
  },
  namespaced: true,
} as Module<IMaterialConfigsState, IRootState>;
