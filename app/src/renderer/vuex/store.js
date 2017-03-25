import Vue from "vue";
import Vuex from "vuex";
import createSelectDirectoryPlugin from "@vuex/plugins/createSelectDirectoryPlugin";
import createOpenPlugin from "@vuex/plugins/createOpenPlugin";
import { remote } from "electron";

Vue.use(Vuex);

export const state = {
  notes: [],
  currentDirectory: null,
  isOpenedFile: false
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
  },
  selectDirectory() {},
  setDirectory(state, payload) {
    state.currentDirectory = payload;
  },
  openFile(state, payload) {
    state.isOpenedFile = true;
    state.notes = payload.keys.map((key, index) => {
      return { key, length: payload.lengths[index] };
    });
  }
};

export function generateSimpleActions(mutations) {
  const actions = {};
  mutations.forEach(mutation => {
    actions[mutation] = ({ commit }, payload) => {
      if (payload) {
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
  "openFile"
]);

/* eslint no-console: 0 */

export default new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [
    createSelectDirectoryPlugin(remote.dialog),
    createOpenPlugin(remote.require("fs"), remote.require("path"))
  ]
});