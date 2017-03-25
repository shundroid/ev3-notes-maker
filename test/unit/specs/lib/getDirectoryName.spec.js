import { assert } from "chai";
import getDirectoryName from "@lib/getDirectoryName";

describe("getDirectoryName", () => {
  it("should return a directory name", () => {
    const path = "C:\\Users\\Test\\Documents\\test-folder";
    const directoryName = "test-folder";
    assert.equal(getDirectoryName(path), directoryName);
  });
});