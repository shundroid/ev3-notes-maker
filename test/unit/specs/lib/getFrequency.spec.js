import { assert } from "chai";
import getFrequency from "@lib/getFrequency";

describe("getFrequency", () => {
  it("should return correct frequency", () => {
    assert.equal(getFrequency(9), 440);
    assert.equal(getFrequency(21), 880);
  })
});
