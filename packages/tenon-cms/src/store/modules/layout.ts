import { Module } from 'vuex';
import { IRootState } from '..';
import { Component } from 'vue';
import TenonProjectLayout from '@/layout/TenonProjectLayout.vue';


export interface ILayoutState {
  activeLayout: Component;
}

export default {
  state() {
    return {
      activeLayout: TenonProjectLayout,
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
