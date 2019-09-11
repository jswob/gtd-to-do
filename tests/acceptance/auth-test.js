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
    await visit("/auth");

    await authenticateSession();

    assert.equal(currentURL(), "/auth/collection");
  });

  test("should redirect to unauth.sign-in if user is not logged in", async function(assert) {
    await visit("/auth/collection");

    await invalidateSession(this.application);

    assert.equal(currentURL(), "/unauth/sign-in");
  });
});
