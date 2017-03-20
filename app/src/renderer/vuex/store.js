import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const state = {
  notes: []
};

export const mutations = {
  addNote(state, payload) {
    payload.key = Date.now();
    state.notes.push(payload);
  },
  removeNote(state, payload) {
    state.notes.splice(payload, 1);
  },
  moveUpNote(state, payload) {
    if (payload <= 0) {
      throw new Error("Tryed to move up but it's first note.");
    }
    const note = state.notes.splice(payload, 1)[0];
    state.notes.splice(payload - 1, 0, note);
  },
  moveDownNote(state, payload) {
    if (payload >= state.notes.length - 1) {
      throw new Error("Tryed to move up but it's last note.");
    }
    const note = state.notes.splice(payload, 1)[0];
    state.notes.splice(payload + 1, 0, note);
  }
};

export function generateSimpleActions(mutations) {
  const actions = {};
  mutations.forEach(mutation => {
    actions[mutation] = ({ commit }, payload) => {
      commit(mutation, payload);
    };
  });
  return actions;
}
export const actions = generateSimpleActions([
  "addNote",
  "removeNote",
  "moveUpNote",
  "moveDownNote"
]);

export default new Vuex.Store({
  state,
  mutations,
  actions
});