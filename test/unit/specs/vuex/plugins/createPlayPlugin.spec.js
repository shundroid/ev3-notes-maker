import { assert } from "chai";
import { default as createPlayPlugin, PlayPlugin } from "@vuex/plugins/createPlayPlugin";
import sinon from "sinon";

describe("createPlayPlugin", () => {
  it("should create plugin", () => {
    const plugin = createPlayPlugin();
    assert.typeOf(plugin, "function");
  });
});

describe("PlayPlugin", () => {
  let plugin;
  beforeEach(done => {
    plugin = new PlayPlugin();
    done();
  });
  describe("#constructor()", () => {
    it("should initialize audioContext", () => {
      assert.instanceOf(plugin.audioCtx, AudioContext);
    });
  });
  describe("#plugin()", () => {
    it("should subscribe", () => {
      const store = {};
      const spy = sinon.spy();
      store.subscribe = spy;
      plugin.plugin(store);
      assert(spy.calledOnce);
    });
  });
  describe("#play()", () => {
    it("should play", done => {
      const oscillator = {
        connect() {},
        type: "",
        frequency: { value: "" },
        start() {},
        stop() {}
      }
      const audioCtx = {
        destination: "",
        createOscillator() {
          return oscillator;
        }
      };
      plugin.audioCtx = audioCtx;
      plugin.play([{ key: 9, length: 1 }]).then(() => {
        assert.equal(oscillator.type, "square");
        assert.equal(oscillator.frequency.value, 440);
        done();
      });
    });
  });
});