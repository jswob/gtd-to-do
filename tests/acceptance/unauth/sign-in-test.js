import { module, test } from "qunit";
import { visit, currentURL, fillIn, click } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";
import {
  authenticateSession,
  currentSession
} from "ember-simple-auth/test-support";

module("Acceptance | unauth/sign in", function(hooks) {
  setupApplicationTest(hooks);

  test("should redirect to auth.collection route if user is logged in", async function(assert) {
    await authenticateSession();

    await visit("/unauth/sign-in");

    assert.equal(currentURL(), "/auth/collection");
  });

  test("should correctly show errors from db", async function(assert) {
    this.server.createList("post", 10);

    await visit("/unauth/sign-in");
    await fillIn(".email > input", "some100@some.some");

    await fillIn(".password > input", "Some12");

    await click(".login-button");

    assert.equal(
      document.querySelector(".paper-input-error").textContent.trim(),
      "Could not find account with that email"
    );

    await fillIn(".email > input", "some1@some.some");

    assert.equal(
      document.querySelector(".paper-input-error").textContent.trim(),
      ""
    );

    await click(".login-button");

    assert.equal(
      document
        .querySelector(".password > .paper-input-error")
        .textContent.trim(),
      "Bad password"
    );
  });

  test("should correctly create session", async function(assert) {
    const session = currentSession();

    await visit("/unauth/sign-in");
    await fillIn(".email > input", "some1@some.some");

    await fillIn(".password > input", "Some123");

    await click(".login-button");

    assert.equal(session.isAuthenticated, true, "user is authenticated");

    assert.equal(
      session.data.authenticated.token,
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzb21lQHNvbWUuc29tZSIsIm5hbWUiOiJTb21lMTIzIiwiaWF0IjoxNTE2MjM5MDIyfQ.C5n7FR6MbqsoVFQ90ScdcH0hNHjc0VjmuzGsPfx2_IY",
      "token should be correct"
    );

    assert.equal(
      currentURL(),
      "/auth/collection",
      "should finish on main page"
    );
  });
});
