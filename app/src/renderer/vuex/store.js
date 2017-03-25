import Vue from "vue";
import Vuex from "vuex";
import createSelectDirectoryPlugin from "@vuex/plugins/createSelectDirectoryPlugin";
import createIOPlugin from "@vuex/plugins/createIOPlugin";
import { remote } from "electron";

Vue.use(Vuex);

export const state = {
  notes: [],
  currentDirectory: null,
  isOpened: false
};

export const mutations = {
  addNote(state, payload) {
    payload.uniqueKey = Date.now();
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
  },
  selectDirectory() {},
  setDirectory(state, payload) {
    state.currentDirectory = payload;
  },
  opened(state, payload) {
    state.isOpened = true;
    state.notes = payload;
  },
  save() {},
  saved() {}
};

export function generateSimpleActions(mutations) {
  const actions = {};
  mutations.forEach(mutation => {
    actions[mutation] = ({ commit }, payload) => {
      if (payload === 0 || payload) {
        commit(mutation, payload);
      } else {
        commit(mutation);
      }
    };
  });
  return actions;
}
export const actions = generateSimpleActions([
  "addNote",
  "removeNote",
  "moveUpNote",
  "moveDownNote",
  "selectDirectory",
  "setDirectory",
  "opened",
  "save",
  "saved"
]);

/* eslint no-console: 0 */

export default new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [
    createSelectDirectoryPlugin(remote.dialog),
    createIOPlugin(remote.require("fs"), remote.require("path"))
  ]
});