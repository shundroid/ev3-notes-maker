import { assert } from "chai";
import getFrequency from "@lib/getFrequency";

describe("getFrequency", () => {
  it("should return correct frequency", () => {
    assert.equal(getFrequency(1), 27.5); // A1
    assert.equal(getFrequency(13), 55); // A2
    assert.equal(getFrequency(25), 110); // A3
    assert.equal(getFrequency(37), 220); // A4
    assert.equal(getFrequency(49), 440); // A5
  });
});
