import { Module } from 'vuex';
import { IRootState } from '..';

export interface IComponentTreeState {
  tree: null | ComponentTreeNode;
}

export interface ComponentTreeNode { }

export default {
  state() {
    return {
      tree: null,
    };
  },
  mutations: {},
  actions: {},
  getters: {
    getTree(state: IComponentTreeState, getters: any, rootState: IRootState, rootGetters: any) {
      return state.tree;
    }
  },
  namespaced: true,
} as Module<IComponentTreeState, IRootState>;