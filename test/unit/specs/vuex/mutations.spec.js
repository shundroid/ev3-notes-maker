import { assert } from "chai";
import { mutations } from "@vuex/store";

describe("mutations", () => {
  describe("addNote", () => {
    it("should add", () => {
      const state = {
        notes: []
      };
      const note = { key: 10, length: 2 };
      mutations.addNote(state, note);
      assert.equal(state.notes.length, 1);
      assert.equal(state.notes[0], note);
      assert(state.notes[0].key);
    });
  });
  describe("removeNote", () => {
    it("should remove", () => {
      const note = { key: 10, length: 2 };
      const note2 = { key: 8, length: 1 };
      const state = {
        notes: [note, note2]
      };
      mutations.removeNote(state, 0);
      assert.equal(state.notes.length, 1);
      assert.equal(state.notes[0], note2);
    });
  });
  describe("moveUpNote", () => {
    it("should move up", () => {
      const note = { key: 10, length: 2 };
      const note2 = { key: 8, length: 1 };
      const state = {
        notes: [note, note2]
      };
      mutations.moveUpNote(state, 1);
      assert.equal(state.notes.length, 2);
      assert.equal(state.notes[0], note2);
      assert.equal(state.notes[1], note);
    });
    it("should throw", () => {
      const note = { key: 10, length: 2 };
      const state = {
        notes: [note]
      };
      assert.throw(() => {
        mutations.moveUpNote(state, 0)
      }, Error);
    });
  });
  describe("moveDownNote", () => {
    it("should move down", () => {
      const note = { key: 10, length: 2 };
      const note2 = { key: 8, length: 1 };
      const state = {
        notes: [note, note2]
      };
      mutations.moveDownNote(state, 0);
      assert.equal(state.notes.length, 2);
      assert.equal(state.notes[0], note2);
      assert.equal(state.notes[1], note);
    });
    it("should throw", () => {
      const note = { key: 10, length: 2 };
      const note2 = { key: 8, length: 1 };
      const state = {
        notes: [note, note2]
      };
      assert.throw(() => {
        mutations.moveDownNote(state, 1)
      }, Error);
    });
  });
  describe("setDirectory", () => {
    it("should change currentdirectory", () => {
      const state = { currentDirectory: null };
      const directory = "test-dir";
      mutations.setDirectory(state, directory);
      assert.equal(state.currentDirectory, directory);
    });
  });
  describe("opened", () => {
    it("should change states", () => {
      const state = { notes: [], isOpened: false };
      const notes = [
        { key: 10, length: 1 },
        { key: 6, length: 0.5 },
        { key: 8, length: 8 },
        { key: 9, length: 7 },
        { key: 2, length: 4 }
      ];
      mutations.opened(state, notes);
      assert.equal(state.notes, notes);
      assert(state.isOpened);
    });
  });
  describe("play", () => {
    it("should set isPlaying to true", () => {
      const state = { isPlaying: false };
      mutations.play(state);
      assert.equal(state.isPlaying, true);
    });
  });
  describe("stop", () => {
    it("should change states", () => {
      const state = { isPlaying: true, playingNoteIndex: 10 };
      mutations.stop(state);
      assert.equal(state.isPlaying, false);
      assert.equal(state.playingNoteIndex, -1);
    });
  });
  describe("played", () => {
    it("should change states", () => {
      const state = { isPlaying: true, playingNoteIndex: 10 };
      mutations.played(state);
      assert.equal(state.isPlaying, false);
      assert.equal(state.playingNoteIndex, -1);
    });
  });
  describe("updatePlayingNoteIndex", () => {
    it("should change playingNoteIndex", () => {
      const state = { playingNoteIndex: -1 };
      const nextIndex = 2;
      mutations.updatePlayingNoteIndex(state, nextIndex);
      assert.equal(state.playingNoteIndex, nextIndex);
    });
  });
});
