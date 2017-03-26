import Vue from "vue";
import Vuex from "vuex";
import createSelectDirectoryPlugin from "@vuex/plugins/createSelectDirectoryPlugin";
import createIOPlugin from "@vuex/plugins/createIOPlugin";
import createPlayPlugin from "@vuex/plugins/createPlayPlugin";
import { remote } from "electron";

Vue.use(Vuex);

export const state = {
  notes: [],
  currentDirectory: null,
  isOpened: false,
  isPlaying: false,
  playingNoteIndex: -1,
  isChanged: false
};

export const mutations = {
  addNote(state, payload) {
    state.isChanged = true;
    if (typeof payload.uniqueKey === "undefined") {
      payload.uniqueKey = state.notes.length;
    }
    state.notes.push(payload);
  },
  removeNote(state, payload) {
    state.isChanged = true;
    state.notes.splice(payload, 1);
  },
  moveUpNote(state, payload) {
    if (payload <= 0) {
      throw new Error("Tryed to move up but it's first note.");
    }
    state.isChanged = true;
    const note = state.notes.splice(payload, 1)[0];
    state.notes.splice(payload - 1, 0, note);
  },
  moveDownNote(state, payload) {
    if (payload >= state.notes.length - 1) {
      throw new Error("Tryed to move up but it's last note.");
    }
    state.isChanged = true;
    const note = state.notes.splice(payload, 1)[0];
    state.notes.splice(payload + 1, 0, note);
  },
  updateNote(state, { index, note }) {
    if (index >= state.notes.length && index < 0) {
      throw new Error("Invalid index: " + index);
    }
    state.isChanged = true;
    state.notes[index].key = note.key;
    state.notes[index].length = note.length;
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
  saved(state) {
    state.isChanged = false;
  },
  play(state) {
    state.isPlaying = true;
  },
  stop(state) {
    state.isPlaying = false;
    state.playingNoteIndex = -1;
  },
  played(state) {
    state.isPlaying = false;
    state.playingNoteIndex = -1;
  },
  updatePlayingNoteIndex(state, index) {
    state.playingNoteIndex = index;
  }
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
export const actions = {
  ...generateSimpleActions([
    "addNote",
    "removeNote",
    "moveUpNote",
    "moveDownNote",
    "updateNote",
    "selectDirectory",
    "setDirectory",
    "opened",
    "save",
    "saved",
    "played",
    "updatePlayingNoteIndex"
  ]),
  togglePlay({ commit, state }) {
    if (state.isPlaying) {
      commit("stop");
    } else {
      commit("play");
    }
  }
};

/* eslint no-console: 0 */

export default new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [
    createSelectDirectoryPlugin(remote.dialog),
    createIOPlugin(remote.require("fs"), remote.require("path")),
    createPlayPlugin(new AudioContext)
  ]
});
