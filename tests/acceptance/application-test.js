import { module, test } from "qunit";
import { visit, currentURL } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";
import {
  invalidateSession,
  authenticateSession
} from "ember-simple-auth/test-support";

module("Acceptance | application", function(hooks) {
  setupApplicationTest(hooks);

  test("should move to unauth.sign-in if user is not logged in", async function(assert) {
    await invalidateSession();
    
    await visit("/");

    assert.equal(currentURL(), "/unauth/sign-in");
  });

  test("should move to auth.collection if user is logged in", async function(assert) {
    await authenticateSession();
    
    await visit("/");

    assert.equal(currentURL(), "/auth/collection");
  });
});
