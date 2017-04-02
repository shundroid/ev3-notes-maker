import { assert } from "chai";
import { getValueAndLabel, getNote, getLength } from "@lib/getNotes";

const note = "whole-note";
const label = "Whole Note";
const length = 1;

describe("getNotes", () => {
  describe("getValueAndLabel", () => {
    it("should transform to value and label", () => {
      const valueAndLabel = getValueAndLabel();
      assert(valueAndLabel[0].value, note);
      assert(valueAndLabel[0].label, label);
    });
  });
  describe("getNote", () => {
    it("should get note", () => {
      assert(getNote(length), note);
    });
    it("should throw", () => {
      assert.throw(() => {
        getNote(0);
      }, Error);
    });
  });
  describe("getLength", () => {
    it("should get length", () => {
      assert(getLength(note), length);
    });
    it("should throw", () => {
      assert.throw(() => {
        getLength("bad-note");
      }, Error);
    });
  });
});