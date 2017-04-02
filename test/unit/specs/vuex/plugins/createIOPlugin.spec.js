import { assert } from "chai";
import { default as createIOPlugin, IOPlugin} from "@vuex/plugins/createIOPlugin";


describe("createIOPlugin", () => {
  it("should create plugin", () => {
    const plugin = createIOPlugin();
    assert.typeOf(plugin, "function");
  });
});
describe("IOPlugin", () => {
  let plugin;
  beforeEach(done => {
    plugin = new IOPlugin({}, {});
    done();
  });
  describe("#toNotes()", () => {
    it("should convert to notes", () => {
      const keyParse1 = "1\r\n2\r\n8\r\n10\r\n20\r\n3\r\n3";
      const lengthParse1 = "1\r\n0.5\r\n1\r\n0.75\r\n0.25\r\n0.1875\r\n1";
      const parseResult1 = [
        { key: "A0", length: "whole-note", uniqueKey: 0 },
        { key: "A#0", length: "half-note", uniqueKey: 1 },
        { key: "E1", length: "whole-note", uniqueKey: 2 },
        { key: "F#1", length: "dotted-half-note", uniqueKey: 3 },
        { key: "E2", length: "quarter-note", uniqueKey: 4 },
        { key: "B0", length: "dotted-eighth-note", uniqueKey: 5 },
        { key: "B0", length: "whole-note", uniqueKey: 6 },
      ];
      const keyParse2 = "1\r\n0.8";
      const lengthParse2 = "1";
      const keyParse3 = "0\r\nhoge";
      const lengthParse3 = "0\r\nhoge";

      assert.deepEqual(plugin.toNotes(keyParse1, lengthParse1), parseResult1);
      assert.throw(() => {
        plugin.toNotes(keyParse2, lengthParse2);
      }, Error);
      assert.throw(() => {
        plugin.toNotes(keyParse3, lengthParse3);
      }, Error);
    });
  });
  describe("#fromNotes()", () => {
    it("should convert from notes", () => {
      const notes = [
        { key: "A2", length: "dotted-half-note" },
        { key: "G#3", length: "quarter-note" },
        { key: "D#2", length: "eighth-note" }
      ];
      const keys = [25, 36, 19];
      const lengths = [0.75, 0.25, 0.125];
      assert.deepEqual(plugin.fromNotes(notes), { keys, lengths });
    });
  });
});
