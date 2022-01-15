import { Module } from 'vuex';
import { IRootState } from '..';
import { IMaterialConfig } from './materials';

export interface IViewerState {
  tree: ComponentTreeNode | null;
  activeComponent: ComponentTreeNode | null;
  hoveringComponent: IMaterialConfig | null;
  draggingComponent: IMaterialConfig | null;
  compId: number;
}

export interface ComponentTreeNode {
  name: string;
  id: number;
  schemas: any;
  parent: ComponentTreeNode | null;
  refs: any;
  refKey?: string;
  ctx?: any;
  textID?: string;
  parentComponent?: ComponentTreeNode;
  material?: IMaterialConfig;
  props?: any;
  states?: any;
  children?: ComponentTreeNode[];
  slots: Object;
  isSlot?: boolean;
  
}

export default {
  state() {
    return {
      tree: {
        name: 'Compose-View',
        id: 0,
        children: [],
        parent: null,
        props: {},
        refs:{},
        schemas: {},
        slots: {},
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
    SET_DRAGGING_COMPONENT(state, component: IMaterialConfig | null) {
      state.draggingComponent = component;
    },
    SET_HOVERING_COMPONENT(state, component: IMaterialConfig | null) {
      state.hoveringComponent = component;
    },
    SET_COMP_ID(state, id: number) {
      state.compId = id;
    }
  },
  actions: {
    setActiveComponent(context, component: ComponentTreeNode) {
      context.commit('SET_ACTIVE_COMPONENT', component);
    },
    setTree(context, tree: ComponentTreeNode) {
      context.commit('SET_TREE', tree);
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
      context.commit('SET_TREE', {
        name: 'Compose-View',
        id: 0,
        children: [],
        props: {},
      });
      context.commit('SET_ACTIVE_COMPONENT', null);
      context.commit('SET_COMP_ID', 0);
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
    getCompId(state: IViewerState, getters: any, rootState: IRootState, rootGetters: any) {
      const id = state.compId;
      state.compId++;
      return id;
    }
  },
  namespaced: true,
} as Module<IViewerState, IRootState>;