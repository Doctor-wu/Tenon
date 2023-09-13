import { getUserModel } from '@/local-db/controller/user';
import { Module } from 'vuex';
import { IRootState } from '..';


export interface IUserState {
  userInfo: {
    username: string;
    phone: string;
    email: string;
  } | null;
}

export default {
  state() {
    return {
      userInfo: null,
    };
  },
  mutations: {
    SET_USERINFO(state, userInfo) {
      state.userInfo = userInfo;
      console.log('[UserInfo] ', state.userInfo);
    }
  },
  actions: {
    setUserInfo({ commit }, payload) {
      commit('SET_USERINFO', payload);
      getUserModel().set({
        userInfo: payload
      });
    },
    clearUserInfo({ commit }) {
      commit('SET_USERINFO', null);
      getUserModel().remove();
    }
  },
  getters: {
    async getUserInfo(state: IUserState) {
      if (!state.userInfo) {
        const existed = await getUserModel().get();
        if (existed) {
          state.userInfo = existed.userInfo;
        }
      }
      return state.userInfo;
    },
  },
  namespaced: true,
} as Module<IUserState, IRootState>;
