import { assert } from "chai";
import { mutations } from "@vuex/store";

describe("mutations", () => {
  describe("addNote", () => {
    it("should add", () => {
      const state = {
        notes: []
      };
      const note = { pitch: 10, length: 2 };
      mutations.addNote(state, note);
      assert.equal(state.notes.length, 1);
      assert.equal(state.notes[0], note);
      assert(state.notes[0].key);
    });
  });
  describe("removeNote", () => {
    it("should remove", () => {
      const note = { pitch: 10, length: 2 };
      const note2 = { pitch: 8, length: 1 };
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
      const note = { pitch: 10, length: 2 };
      const note2 = { pitch: 8, length: 1 };
      const state = {
        notes: [note, note2]
      };
      mutations.moveUpNote(state, 1);
      assert.equal(state.notes.length, 2);
      assert.equal(state.notes[0], note2);
      assert.equal(state.notes[1], note);
    });
    it("should throw", () => {
      const note = { pitch: 10, length: 2 };
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
      const note = { pitch: 10, length: 2 };
      const note2 = { pitch: 8, length: 1 };
      const state = {
        notes: [note, note2]
      };
      mutations.moveDownNote(state, 0);
      assert.equal(state.notes.length, 2);
      assert.equal(state.notes[0], note2);
      assert.equal(state.notes[1], note);
    });
    it("should throw", () => {
      const note = { pitch: 10, length: 2 };
      const note2 = { pitch: 8, length: 1 };
      const state = {
        notes: [note, note2]
      };
      assert.throw(() => {
        mutations.moveDownNote(state, 1)
      }, Error);
    });
  });
});