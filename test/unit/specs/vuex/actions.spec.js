import { assert } from "chai";
import { generateSimpleActions, actions } from "@vuex/store";
import sinon from "sinon";

describe("actions", () => {
  describe("generateSimpleActions", () => {
    it("should generate actions", () => {
      const mutationName = "mutation-1";
      const mutations = [mutationName];
      const payload = "payload";
      const actions = generateSimpleActions(mutations);
      assert(actions[mutationName]);
      const spy = sinon.spy();
      actions[mutationName]({ commit: spy }, payload);
      assert(spy.withArgs(mutationName, payload).calledOnce);
    });
  });
  describe("togglePlay", () => {
    it("should commit play", () => {
      const spy = sinon.spy();
      const state = { isPlaying: false };
      actions.togglePlay({ commit: spy, state });
      assert(spy.withArgs("play").calledOnce);
    });
    it("should commit stop", () => {
      const spy = sinon.spy();
      const state = { isPlaying: true };
      actions.togglePlay({ commit: spy, state });
      assert(spy.withArgs("stop").calledOnce);
    });
  });
});
