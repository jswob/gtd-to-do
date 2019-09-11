import { module, test } from "qunit";
import { visit, currentURL } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";
import {
  invalidateSession,
  authenticateSession
} from "ember-simple-auth/test-support";

module("Acceptance | auth", function(hooks) {
  setupApplicationTest(hooks);

  test("should redirect to auth.collection route if user is logged in", async function(assert) {
    await authenticateSession();
    
    await visit("/auth");

    assert.equal(currentURL(), "/auth/collection");
  });

  test("should redirect to unauth.sign-in if user is not logged in", async function(assert) {
    await invalidateSession(this.application);
    
    await visit("/auth/collection");

    assert.equal(currentURL(), "/unauth/sign-in");
  });
});
