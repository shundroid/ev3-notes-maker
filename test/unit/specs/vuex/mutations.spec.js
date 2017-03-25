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
    const state = { currentDirectory: null };
    const directory = "test-dir";
    mutations.setDirectory(state, directory);
    assert.equal(state.currentDirectory, directory);
  });
  describe("openFile", () => {
    const state = { notes: [] };
    const notes = {
      keys: [10, 6, 8, 9, 2],
      lengths: [1, 0.5, 8, 7, 4]
    };
    const correctNotes = [
      { key: 10, length: 1 },
      { key: 6, length: 0.5 },
      { key: 8, length: 8 },
      { key: 9, length: 7 },
      { key: 2, length: 4 }
    ];
    mutations.openFile(state, notes);
    assert.deepEqual(state.notes, correctNotes);
  })
});