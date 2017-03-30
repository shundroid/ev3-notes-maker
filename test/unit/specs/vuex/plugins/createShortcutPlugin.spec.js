import { assert } from "chai";
import { default as createShortcutPlugin, ShortcutPlugin, getKey } from "@vuex/plugins/createShortcutPlugin";
import sinon from "sinon";

describe("createShortcutPlugin", () => {
  it("should create plugin", () => {
    assert.typeOf(createShortcutPlugin(), "function");
  });
});

describe("ShortcutPlugin", () => {
  let plugin;
  beforeEach(done => {
    plugin = new ShortcutPlugin();
    done();
  });
  describe("#constructor()", () => {
    it("should initialize store", () => {
      assert.equal(plugin.store, null);
    });
  });
  describe("#setStore()", () => {
    it("should set store", () => {
      const store = { dispatch() {} };
      plugin.setStore(store);
      assert.equal(plugin.store, store);
    });
  });
  describe("#dispatchShortcut()", () => {
    it("should do nothing", () => {
      const preventDefaultSpy = sinon.spy();
      const dispatchSpy = sinon.spy();
      plugin.store = { dispatch: dispatchSpy };
      plugin.dispatchShortcut({
        key: "TEST-KEY",
        ctrlKey: false,
        shiftKey: false,
        altKey: false,
        preventDefault: preventDefaultSpy
      });
      assert(!preventDefaultSpy.called);
      assert(!dispatchSpy.called);
    });
    it("should dispatch a action", () => {
      const preventDefaultSpy = sinon.spy();
      const dispatchSpy = sinon.spy();
      plugin.store = { dispatch: dispatchSpy };
      plugin.dispatchShortcut({
        key: " ",
        ctrlKey: false,
        shiftKey: false,
        altKey: false,
        preventDefault: preventDefaultSpy
      });
      assert(preventDefaultSpy.called);
      assert(dispatchSpy.withArgs("togglePlay").called);
    });
  });
});

describe("getKey", () => {
  const key1 = { key: "s", isControl: true, isShift: false, isAlt: false };
  const key2 = { key: "a", isControl: true, isShift: false, isAlt: true };
  const key3 = { key: "B", isControl: true, isShift: true, isAlt: true };

  const return1 = "C-s";
  const return2 = "C-A-a";
  const return3 = "C-S-A-b";

  it("should return correct keys", () => {
    assert.equal(getKey(key1.key, key1.isControl, key1.isShift, key1.isAlt), return1);
    assert.equal(getKey(key2.key, key2.isControl, key2.isShift, key2.isAlt), return2);
    assert.equal(getKey(key3.key, key3.isControl, key3.isShift, key3.isAlt), return3);
  });
});