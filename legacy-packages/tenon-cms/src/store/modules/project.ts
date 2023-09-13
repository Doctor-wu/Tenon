import { getProjectModel } from '@/local-db/controller/project';
import { Module } from 'vuex';
import { IRootState } from '..';


export interface IProjectState {
  projectInfo: {
    createTime: string;
    projectName: string;
    userConfig: any;
  } | null;
}

export default {
  state() {
    return {
      projectInfo: null,
    };
  },
  mutations: {
    SET_PROJECT_INFO(state, userInfo) {
      state.projectInfo = userInfo;
    }
  },
  actions: {
    setProjectInfo({ commit }, payload) {
      commit('SET_PROJECT_INFO', payload);
      getProjectModel().set({
        project: payload
      });
    },
    clearProjectInfo({ commit }) {
      commit('SET_PROJECT_INFO', null);
      getProjectModel().remove();
    }
  },
  getters: {
    async getProjectInfo(state: IProjectState) {
      if (!state.projectInfo) {
        const existed = await getProjectModel().get();
        if (existed) {
          state.projectInfo = existed.project;
        }
      }
      return state.projectInfo;
    },
  },
  namespaced: true,
} as Module<IProjectState, IRootState>;
