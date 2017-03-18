import { assert } from "chai";
import { mutations } from "../src/store";

describe("mutations", () => {
  it("addNote", () => {
    const state = {
      notes: []
    };
    const note = { pitch: 10, length: 2 };
    mutations.addNote(state, note);
    assert.equal(state.notes.length, 1);
    assert.equal(state.notes[0], note);
  });
  it("removeNote", () => {
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