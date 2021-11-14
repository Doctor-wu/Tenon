import { Module } from 'vuex';
import { IRootState } from '..';
import { IMaterial } from './materials';

export interface IViewerState {
  tree: ComponentTreeNode | null;
  activeComponent: ComponentTreeNode | null;
  hoveringComponent: IMaterial | null;
  draggingComponent: IMaterial | null;
  compId: number;
}

export interface ComponentTreeNode {
  name: string;
  id: number;
  textID?: string;
  material?: IMaterial;
  children: ComponentTreeNode[];
}

export default {
  state() {
    return {
      tree: {
        name: 'Compose-View',
        id: 0,
        children: [],
      },
      activeComponent: null,
      hoveringComponent: null,
      draggingComponent: null,
      compId: 0,
    };
  },
  mutations: {
    SET_ACTIVE_COMPONENT(state, component: ComponentTreeNode) {
      state.activeComponent = component;
    },
    SET_TREE(state, tree: ComponentTreeNode) {
      state.tree = tree
    },
    SET_DRAGGING_COMPONENT(state, component: IMaterial | null) {
      state.draggingComponent = component;
    },
    SET_HOVERING_COMPONENT(state, component: IMaterial | null) {
      state.hoveringComponent = component;
    },
    SET_COMP_ID(state) {
      state.compId++;
    }
  },
  actions: {
    setActiveComponent(context, component: ComponentTreeNode) {
      context.commit('SET_ACTIVE_COMPONENT', component);
    },
    setTree(context, tree: ComponentTreeNode) {
      context.commit('SET_TREE', tree);
    },
    setDraggingComponent(context, component: IMaterial | null) {
      context.commit('SET_DRAGGING_COMPONENT', component);
    },
    setHoveringComponent(context, component: IMaterial | null) {
      context.commit('SET_HOVERING_COMPONENT', component);
    },
    setCompId(context) {
      context.commit('SET_COMP_ID');
      return context.state.compId;
    }
  },
  getters: {
    getTree(state: IViewerState, getters: any, rootState: IRootState, rootGetters: any) {
      return state.tree;
    },
    getActiveComponent(state: IViewerState, getters: any, rootState: IRootState, rootGetters: any) {
      return state.activeComponent;
    },
    getDraggingComponent(state: IViewerState, getters: any, rootState: IRootState, rootGetters: any) {
      return state.draggingComponent;
    },
    getHoveringComponent(state: IViewerState, getters: any, rootState: IRootState, rootGetters: any) {
      return state.hoveringComponent;
    },
  },
  namespaced: true,
} as Module<IViewerState, IRootState>;