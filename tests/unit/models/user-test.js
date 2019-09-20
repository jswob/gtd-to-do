import { module, test } from "qunit";
import { setupTest } from "ember-qunit";
import { run } from "@ember/runloop";

module("Unit | Model | user", function(hooks) {
  setupTest(hooks);

  test("should dynamically update errors arrays", async function(assert) {
    let store = this.owner.lookup("service:store");
    let user = store.createRecord("user", {});

    await run(() =>
      user.set("email", "Somebody once told me the world is gonna roll me")
    );
    assert.equal(user.get("emailErrors").length, 1);
    await run(() => user.set("email", "some@some.some"));
    assert.equal(user.get("emailErrors").length, 0);

    await run(() =>
      user.set("password", "I ain't the sharpest tool in the shed")
    );
    assert.equal(user.get("passwordErrors").length, 1);
    await run(() => user.set("password", "Some123"));
    assert.equal(user.get("passwordErrors").length, 0);
  });
});
