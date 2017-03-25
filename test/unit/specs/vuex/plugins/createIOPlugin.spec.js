import { assert } from "chai";
import { default as createIOPlugin, IOPlugin} from "@vuex/plugins/createIOPlugin";


describe("createIOPlugin", () => {
  it("should create plugin", () => {
    const plugin = createIOPlugin();
    assert.typeOf(plugin, "function");
  });
  it("should parse", () => {
    const plugin = new IOPlugin({}, {});
    const parse1 = "1\r\n0.5\r\n8\r\n10\r\n100\r\n0.01\r\n3";
    const parseResult1 = [1, 0.5, 8, 10, 100, 0.01, 3];
    const parse2 = "1\r\n0.8\r\n40\r\nhoge";

    assert.deepEqual(plugin.parse(parse1), parseResult1);
    assert.throw(() => {
      plugin.parse(parse2)
    }, Error);
  });
});