import { Module } from 'vuex';
import { IRootState } from '..';
import { Component } from 'vue';


export interface ILayoutState {
  activeLayout: () => Promise<Component>;
}

export default {
  state() {
    return {
      activeLayout: () => import("@/layout/EditorLayout.vue"),
    };
  },
  mutations: {
    SET_LAYOUT(state, layout) {
      state.activeLayout = layout;
    }
  },
  actions: {
    setLayout({ commit }, layout) {
      commit('SET_LAYOUT', layout);
    },
  },
  getters: {
    async getActiveLayout(state: ILayoutState) {
      return await state.activeLayout();
    },
  },
  namespaced: true,
} as Module<ILayoutState, IRootState>;
