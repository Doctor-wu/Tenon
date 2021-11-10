import { Module } from 'vuex';
import { IRootState } from '..';
import { IMaterial } from './materials';

export interface IViewerState {
  tree?: ComponentTreeNode;
  activeComponent?: ComponentTreeNode;
  draggingComponent?: IMaterial;
}

export interface ComponentTreeNode {
  children?: ComponentTreeNode[];
}

export default {
  state() {
    return {
      tree: null,
      activeComponent: null,
    };
  },
  mutations: {
    SET_ACTIVE_COMPONENT(state, component: ComponentTreeNode) {
      state.activeComponent = component;
    },
    SET_TREE(state, tree: ComponentTreeNode) {
      state.tree = tree
    },
  },
  actions: {
    setActiveComponent(context, component: ComponentTreeNode) {
      context.commit('SET_ACTIVE_COMPONENT', component);
    },
    setTree(context, tree: ComponentTreeNode) {
      context.commit('SET_TREE', tree);
    },
  },
  getters: {
    getTree(state: IViewerState, getters: any, rootState: IRootState, rootGetters: any) {
      return state.tree;
    },
    getActiveComponent(state: IViewerState, getters: any, rootState: IRootState, rootGetters: any) {
      return state.activeComponent;
    },
  },
  namespaced: true,
} as Module<IViewerState, IRootState>;