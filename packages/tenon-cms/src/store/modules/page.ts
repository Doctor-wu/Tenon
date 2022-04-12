import { getPageInfoApi, getTenonEventsApi } from '@/api';
import { getPageModel } from '@/local-db/controller/page';
import { Message } from '@arco-design/web-vue';
import { eventsMap, IEventMeta, TenonComponent } from '@tenon/engine';
import { cloneDeep } from 'lodash';
import { ref } from 'vue';
import { Module } from 'vuex';
import { IRootState } from '..';

export const currPageInfo = ref<IPageState["pageInfo"]>();

export interface IPageState {
  pageInfo: {
    _id: string;
    newestVersion: number;
    pageName: string;
    belongProjectId: any;
    newestId: number;
    tree: any;
    events?: any[];
    pageStates: any;
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
      currPageInfo.value = state.pageInfo;
      console.log('[PageInfo] ', pageInfo);
    }
  },
  actions: {
    setPageInfo({ commit }, payload) {
      commit('SET_PAGE_INFO', payload);
      getPageModel().set({
        page: cloneDeep(payload)
      });
      eventsMap.value = (() => {
        const map = new Map<string, IEventMeta>();
        (payload.events || []).forEach(eventItem => {
          map.set(eventItem._id, eventItem);
        });
        return map;
      })();
    },
    clearPageInfo({ commit }) {
      commit('SET_PAGE_INFO', null);
      getPageModel().remove();
    },
    async updatePageEvent({ dispatch, state }) {
      const _currPageInfo = Object.assign({}, state.pageInfo);
      const {
        success, errorMsg, data
      } = await getTenonEventsApi(_currPageInfo?._id);
      if (!success) {
        return Message.error(errorMsg!);
      }
      _currPageInfo.events = data;
      dispatch('setPageInfo', _currPageInfo);
    },
    async updatePageInfo({ dispatch, state }) {
      const currPageInfo = state.pageInfo;
      const {
        success, errorMsg, data
      } = await getPageInfoApi(currPageInfo?._id);
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
      currPageInfo.value = state.pageInfo;
      return state.pageInfo;
    },
  },
  namespaced: true,
} as Module<IPageState, IRootState>;
