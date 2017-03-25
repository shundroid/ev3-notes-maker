import { assert } from "chai";
import createSelectDirectoryPlugin from "@vuex/plugins/createSelectDirectoryPlugin";
import sinon from "sinon";

describe("createSelectDirectoryPlugin", () => {
  const dialog = {
    showOpenDialog() {}
  };
  const mutation = { type: "selectDirectory" };
  let store, plugin;
  beforeEach(done => {
    plugin = createSelectDirectoryPlugin(dialog);
    store = {};
    done();
  });
  it("should create plugin", () => {
    assert.typeOf(plugin, "function");
  });
  it("should subscribe to store", () => {
    const spy = sinon.spy();
    store.subscribe = spy;
    plugin(store);
    assert(spy.calledOnce);
  });
  it("should open dialog", () => {
    const spy = sinon.spy(dialog, "showOpenDialog");
    let callback = null;
    store.subscribe = _callback => { callback = _callback };
    plugin(store);
    assert(callback);
    callback(mutation);
    assert(spy.calledOnce);
    spy.restore();
  })
  it("should dispatch a event");
});