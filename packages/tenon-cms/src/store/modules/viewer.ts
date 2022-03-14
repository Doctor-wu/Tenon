import { Module } from 'vuex';
import { IRootState } from '..';
import { ComponentTreeNode, TenonComponent } from "@tenon/engine"
import { IMaterialConfig } from '@tenon/materials';
import { getTreeModel } from "@/local-db";

const treeModel = getTreeModel();
export interface IViewerState {
  defaultTree: TenonComponent | null;
  tree: TenonComponent | null;
  activeComponent: TenonComponent | null;
  hoveringComponent: IMaterialConfig | null;
  draggingComponent: IMaterialConfig | null;
  compId: number;
  scale: number;
}

const defaultTree: null = null;

export default {
  state() {
    return {
      defaultTree: null,
      tree: defaultTree,
      activeComponent: null,
      hoveringComponent: null,
      draggingComponent: null,
      compId: 0,
      scale: 1,
    };
  },
  mutations: {
    SET_ACTIVE_COMPONENT(state, component: TenonComponent) {
      state.activeComponent = component;
    },
    SET_TREE(state, tree: TenonComponent) {
      state.tree = tree
    },
    SET_DEFAULT_TREE(state, tree: TenonComponent) {
      state.defaultTree = tree
    },
    SET_DRAGGING_COMPONENT(state, component: IMaterialConfig | null) {
      state.draggingComponent = component;
    },
    SET_HOVERING_COMPONENT(state, component: IMaterialConfig | null) {
      state.hoveringComponent = component;
    },
    SET_COMP_ID(state, id: number) {
      state.compId = id;
    },
    SET_SCALE(state, scale) {
      state.scale = scale;
    }
  },
  actions: {
    setActiveComponent(context, component: ComponentTreeNode) {
      context.commit('SET_ACTIVE_COMPONENT', component);
    },
    setTree(context, tree: ComponentTreeNode) {
      context.commit('SET_TREE', tree);
    },
    setDefaultTree(context, tree: ComponentTreeNode) {
      context.commit('SET_DEFAULT_TREE', tree);
    },
    setDraggingComponent(context, component: IMaterialConfig | null) {
      context.commit('SET_DRAGGING_COMPONENT', component);
    },
    setHoveringComponent(context, component: IMaterialConfig | null) {
      context.commit('SET_HOVERING_COMPONENT', component);
    },
    setCompId(context, id?: number) {
      context.commit('SET_COMP_ID', id);
      return context.state.compId;
    },
    clearTree(context) {
      context.commit('SET_TREE', context.getters['getDefaultTree'].clone());
      context.commit('SET_ACTIVE_COMPONENT', null);
      context.commit('SET_COMP_ID', 0);
    },
    setScale({ commit }, scale: number) {
      commit('SET_SCALE', scale);
    }
  },
  getters: {
    getTree(state: IViewerState, getters: any, rootState: IRootState, rootGetters: any) {
      return state.tree;
    },
    getDefaultTree(state: IViewerState, getters: any, rootState: IRootState, rootGetters: any) {
      return state.defaultTree;
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
    getCompId(state: IViewerState, getters: any, rootState: IRootState, rootGetters: any) {
      const id = state.compId;
      state.compId++;
      return id;
    },
    scale(state: IViewerState) {
      return state.scale;
    }
  },
  namespaced: true,
} as Module<IViewerState, IRootState>;