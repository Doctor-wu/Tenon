import { Module } from 'vuex';
import { IRootState } from '..';
import { Component } from 'vue';
import TenonProjectLayout from '@/layout/TenonProjectLayout.vue';


export interface ILayoutState {
  activeLayout: Component;
  loadingLayout: boolean;
}

export default {
  state() {
    return {
      activeLayout: TenonProjectLayout,
      loadingLayout: false,
    };
  },
  mutations: {
    SET_LAYOUT(state, layout) {
      state.activeLayout = layout;
    },
    SET_LOADING(state, loading) {
      state.loadingLayout = loading;
    }
  },
  actions: {
    setActiveLayout({ commit }, layout) {
      commit('SET_LAYOUT', layout);
    },
    setLoading({ commit }, loading: boolean) {
      commit('SET_LOADING', loading);
    }
  },
  getters: {
    getActiveLayout(state: ILayoutState) {
      return state.activeLayout;
    },
    isLoading(state: ILayoutState) {
      return state.loadingLayout;
    }
  },
  namespaced: true,
} as Module<ILayoutState, IRootState>;
