import { assert } from "chai";
import { generateOctaves, allKeys, getKeyNumber, getTypeOfKey } from "@lib/getOctaves";

describe("getOctaves", () => {
  describe("generateOctaves", () => {
    it("should generate octaves", () => {
      const octaves = generateOctaves();
      assert.equal(octaves.length, 12 * 7);
      assert.equal(octaves[0], "C1");
      assert.equal(octaves[12 * 7 - 1], "B7");
    });
  });
  describe("allKeys", () => {
    it("should be correct keys", () => {
      assert.equal(allKeys.length, 88);
      assert.equal(allKeys[1], "A#0");
      assert.equal(allKeys[85], "A#7");
    });
  });
  describe("getKeyNumber", () => {
    it("should get key number", () => {
      assert.equal(getKeyNumber("A0"), 1);
      assert.equal(getKeyNumber("C#1"), 5);
    });
    it("should throw", () => {
      assert.throw(() => {
        getKeyNumber("H1");
      }, Error);
    });
  });
  describe("getTypeOfKey", () => {
    it("should get type of key", () => {
      assert.equal(getTypeOfKey("C1"), "white");
      assert.equal(getTypeOfKey("G#4"), "black");
    });
  });
});