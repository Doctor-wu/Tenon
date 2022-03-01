import { Module } from 'vuex';
import { IRootState } from '..';
import { Component } from 'vue';
import EditorLayout from '@/layout/EditorLayout.vue';


export interface ILayoutState {
  activeLayout: Component;
}

export default {
  state() {
    return {
      activeLayout: EditorLayout,
    };
  },
  mutations: {
    SET_LAYOUT(state, layout) {
      state.activeLayout = layout;
    }
  },
  actions: {
    setActiveLayout({ commit }, layout) {
      commit('SET_LAYOUT', layout);
    },
  },
  getters: {
    getActiveLayout(state: ILayoutState) {
      return state.activeLayout;
    },
  },
  namespaced: true,
} as Module<ILayoutState, IRootState>;
