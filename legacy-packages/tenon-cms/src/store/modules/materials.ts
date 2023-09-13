import { Module } from 'vuex';
import { IRootState } from '..';
import { ISchema, ComponentTreeNode } from '@tenon/legacy-engine';
import { IMaterial } from '@tenon/legacy-materials';


export interface IMaterialConfigsState {
  materials: Map<string, [string, () => IMaterial][]>;
  materialsMap: Map<string, () => IMaterial>;
}

export default {
  state() {
    return {
      materials: new Map(),
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
