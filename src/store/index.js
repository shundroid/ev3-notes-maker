import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const state = {
  notes: []
};

export const mutations = {
  addNote(state, payload) {
    state.notes.push(payload);
  },
  removeNote(state, payload) {
    state.notes.splice(payload, 1);
  }
};

export const actions = {
  addNote({ commit }, payload) {
    commit("addNote", payload);
  },
  removeNote({ commit }, payload) {
    commit("removeNote", payload);
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});