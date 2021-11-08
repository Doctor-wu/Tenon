import { Module } from 'vuex';
import { IRootState } from '..';

export interface IComponentTreeState {
  tree?: ComponentTreeNode;
  activeComponent?: ComponentTreeNode;
}

export interface ComponentTreeNode { }

export default {
  state() {
    return {
      tree: null,
      activeComponent: null,
    };
  },
  mutations: {},
  actions: {},
  getters: {
    getTree(state: IComponentTreeState, getters: any, rootState: IRootState, rootGetters: any) {
      return state.tree;
    },
    getActiveComponent(state: IComponentTreeState, getters: any, rootState: IRootState, rootGetters: any) {
      return state.activeComponent;
    },
  },
  namespaced: true,
} as Module<IComponentTreeState, IRootState>;