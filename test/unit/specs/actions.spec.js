import { assert } from "chai";
import { generateSimpleActions } from "../../../app/src/renderer/vuex/store";
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
});