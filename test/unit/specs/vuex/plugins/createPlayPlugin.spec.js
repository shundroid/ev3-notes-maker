import { assert } from "chai";
import { default as createPlayPlugin, PlayPlugin } from "@vuex/plugins/createPlayPlugin";
import sinon from "sinon";

const audioContext = new AudioContext();
const frequency = 440;

describe("createPlayPlugin", () => {
  it("should create plugin", () => {
    const plugin = createPlayPlugin(audioContext);
    assert.typeOf(plugin, "function");
  });
});

describe("PlayPlugin", () => {
  let plugin, audioCtx, oscillator, notes;
  beforeEach(done => {
    plugin = new PlayPlugin(audioContext);
    audioCtx = {
      destination: "",
      createOscillator() {
        return oscillator;
      }
    };
    oscillator = {
      connect() {},
      type: "",
      frequency: { value: "" },
      start() {},
      stop() {}
    };
    notes = [{ key: 49, length: 1 }];
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
    it("should initialize oscillators", () => {
      assert.equal(plugin.currentOsc, null);
      assert.equal(plugin.previewOsc, null);
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
  describe("#startPreview()", () => {
    it("should make previewOsc", () => {
      plugin.audioCtx = audioCtx;
      const connectSpy = sinon.spy(oscillator, "connect");
      const startSpy = sinon.spy(oscillator, "start");
      plugin.startPreview(frequency);
      assert.equal(oscillator.type, "square");
      assert.equal(oscillator.frequency.value, frequency);
      assert(connectSpy.withArgs(plugin.gainNode).calledOnce);
      assert(startSpy.calledOnce);
      connectSpy.restore();
      startSpy.restore();
    });
  });
  describe("#generateSequence()", () => {
    it("should generate", () => {
      plugin.audioCtx = audioCtx;
      const itr = plugin.generateSequence(notes);
      assert.deepEqual([...itr], [[0].concat(notes)]);
      assert.equal(oscillator.type, "square");
      assert.equal(oscillator.frequency.value, frequency);
    });
    it("should stop preview", () => {
      const spy = sinon.spy(plugin, "stopPreview");
      plugin.previewOsc = oscillator;
      plugin.audioCtx = audioCtx;
      [...plugin.generateSequence(notes)];
      assert(spy.calledOnce);
      spy.restore();
    });
  });
  describe("#stop()", () => {
    it("should clear timeoutId", () => {
      plugin.timeoutId = setTimeout(() => {}, 10000);
      plugin.currentOsc = { stop() {} };
      plugin.stop();
      assert.equal(plugin.timeoutId, null);
    });
    it("should stop", () => {
      const spy = sinon.spy();
      plugin.timeoutId = setTimeout(() => {}, 10000);
      plugin.currentOsc = { stop: spy };
      plugin.stop();
      assert(spy.calledOnce);
    });
  });
});
