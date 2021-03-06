import { module, test } from "qunit";
import { visit, currentURL, fillIn, click } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";
import {
  authenticateSession,
  currentSession
} from "ember-simple-auth/test-support";
import { setupMirage } from "ember-cli-mirage/test-support";

module("Acceptance | unauth/sign up", function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test("should redirect to auth.collection route if user is logged in", async function(assert) {
    await authenticateSession();

    await visit("/unauth/sign-up");

    assert.equal(currentURL(), "/auth/collection");
  });

  test("should correctly show error from db", async function(assert) {
    this.server.post(
      "/users",
      () => {
        return {
          errors: [
            {
              detail: "That email was already taken",
              source: {
                pointer: "data/attributes/email"
              }
            }
          ]
        };
      },
      422
    );

    await visit("/unauth/sign-up");
    await fillIn(".email > input", "some@some.some");

    await fillIn(".password > input", "Some123");

    await fillIn(".re-password > input", "Some123");

    await click(".submit-button");

    assert.equal(
      document.querySelector(".paper-input-error").textContent.trim(),
      "That email was already taken"
    );
  });

  test("should correctly sign in after creating user", async function(assert) {
    const session = currentSession();

    await visit("/unauth/sign-up");
    await fillIn(".email > input", "some@some.some");

    await fillIn(".password > input", "Some123");

    await fillIn(".re-password > input", "Some123");

    await click(".submit-button");

    assert.equal(session.isAuthenticated, true, "user session is created");

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

  test("should move to sign-in route after clicking on link", async function(assert) {
    assert.expect(2);

    await visit("/unauth/sign-up");

    assert.equal(currentURL(), "/unauth/sign-up", "starts in /unauth/sign-up");

    await click(".transition-link");

    assert.equal(currentURL(), "/unauth/sign-in", "ends in /unauth/sign-in");
  });
});
