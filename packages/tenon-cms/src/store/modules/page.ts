import { getPageModel } from '@/local-db/controller/page';
import { Module } from 'vuex';
import { IRootState } from '..';


export interface IPageState {
  pageInfo: {
    newestVersion: number;
    pageName: string;
    belongProjectId: any;
    tree: any;
  } | null;
}

export default {
  state() {
    return {
      pageInfo: null,
    };
  },
  mutations: {
    SET_PAGE_INFO(state, pageInfo) {
      state.pageInfo = pageInfo;
    }
  },
  actions: {
    setPageInfo({ commit }, payload) {
      commit('SET_PAGE_INFO', payload);
      getPageModel().set({
        page: payload
      });
    },
    clearPageInfo({ commit }) {
      commit('SET_PAGE_INFO', null);
      getPageModel().remove();
    }
  },
  getters: {
    async getPageInfo(state: IPageState) {
      if (!state.pageInfo) {
        const existed = await getPageModel().get();
        if (existed) {
          state.pageInfo = existed.page;
        }
      }
      return state.pageInfo;
    },
  },
  namespaced: true,
} as Module<IPageState, IRootState>;
