import { module, test } from "qunit";
import { visit, currentURL } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";
import {
  authenticateSession,
  invalidateSession
} from "ember-simple-auth/test-support";

module("Acceptance | unauth", function(hooks) {
  setupApplicationTest(hooks);

  test("should redirect to unauth.sign-in route if user is not logged in", async function(assert) {
    await invalidateSession(this.application);

    await visit("/unauth");

    assert.equal(currentURL(), "/unauth/sign-in");
  });

  test("should redirect to auth.collection route if user is logged in", async function(assert) {
    await authenticateSession();
    
    await visit("/unauth");

    assert.equal(currentURL(), "/auth/collection");
  });
});
