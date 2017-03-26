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
      assert(plugin.audioCtx);
      assert.instanceOf(plugin.audioCtx, AudioContext);
    });
    it("should initialize gainNode", () => {
      assert(plugin.gainNode);
      assert.instanceOf(plugin.gainNode, GainNode);
      assert.equal(Math.round(plugin.gainNode.gain.value * 10) / 10, 0.1);
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
  describe("#generateSequence()", () => {
    it("should generate", () => {
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
      const notes = [{ key: 9, length: 1 }];
      plugin.audioCtx = audioCtx;
      const it = plugin.generateSequence(notes);
      assert.deepEqual([...it], notes);
      assert.equal(oscillator.type, "square");
      assert.equal(oscillator.frequency.value, 440);
    });
  });
});