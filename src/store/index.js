import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notes: []
  },
  mutations: {
    addNote(state, payload) {
      state.notes.push(payload);
    }
  },
  actions: {
    addNote({ commit }, payload) {
      commit("addNote", payload);
    }
  }
});