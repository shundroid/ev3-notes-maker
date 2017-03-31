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
      const lengthParse1 = "0\r\n0.5\r\n1\r\n10\r\n100\r\n0.01\r\n3";
      const parseResult1 = [
        { key: "A0", length: 0, uniqueKey: 0 },
        { key: "A#0", length: 0.5, uniqueKey: 1 },
        { key: "E1", length: 1, uniqueKey: 2 },
        { key: "F#1", length: 10, uniqueKey: 3 },
        { key: "E2", length: 100, uniqueKey: 4 },
        { key: "B0", length: 0.01, uniqueKey: 5 },
        { key: "B0", length: 3, uniqueKey: 6 },
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
        { key: "A2", length: 2 },
        { key: "G#3", length: 1.6 },
        { key: "D#2", length: 12000 }
      ];
      const keys = [25, 36, 19];
      const lengths = [2, 1.6, 12000];
      assert.deepEqual(plugin.fromNotes(notes), { keys, lengths });
    });
  });
});
