import { getPageInfoApi } from '@/api';
import { getPageModel } from '@/local-db/controller/page';
import { Message } from '@arco-design/web-vue';
import { Module } from 'vuex';
import { IRootState } from '..';


export interface IPageState {
  pageInfo: {
    _id: string;
    newestVersion: number;
    pageName: string;
    belongProjectId: any;
    newestId: number;
    tree: any;
    events?: any[];
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
    },
    async updatePageInfo({ commit, dispatch, state }) {
      await getPageModel().remove();
      const {
        success, errorMsg, data
      } = await getPageInfoApi(state.pageInfo?._id);
      if (!success) {
        return Message.error(errorMsg!);
      }
      dispatch('setPageInfo', data);
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
