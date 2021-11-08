import { Module } from 'vuex';
import { IRootState } from '..';

export interface IComponentTreeState {

}

export default {
  state() {
    return {};
  },
  mutations: {},
  actions: {},
  getters: {},
  namespaced: true,
} as Module<IComponentTreeState, IRootState>;