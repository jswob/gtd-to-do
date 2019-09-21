import { module, test } from "qunit";
import { visit, currentURL, fillIn, click } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";
import {
  authenticateSession,
  currentSession
} from "ember-simple-auth/test-support";
import { setupMirage } from "ember-cli-mirage/test-support";

module("Acceptance | unauth/sign in", function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test("should redirect to auth.collection route if user is logged in", async function(assert) {
    await authenticateSession();

    await visit("/unauth/sign-in");

    assert.equal(currentURL(), "/auth/collection");
  });

  test("should correctly show errors from db", async function(assert) {
    this.server.createList("user", 10);
    this.server.post(
      "/auth/login",
      (schema, request) => {
        const errors = [];
        const data = JSON.parse(request.requestBody);
        const account = schema.users.findBy({ email: data.username });
        if (!account) {
          errors.push({
            detail: "Could not find account with that email",
            source: {
              pointer: "data/attributes/email"
            }
          });

          return { errors: errors };
        }
        if (account.password !== data.password) {
          errors.push({
            detail: "Bad password",
            source: {
              pointer: "data/attributes/password"
            }
          });

          return { errors: errors };
        }
      },
      422
    );

    await visit("/unauth/sign-in");
    await fillIn(".email > input", "some100@some.some");

    await fillIn(".password > input", "Some12");

    await click(".login-button");

    assert.equal(
      this.element.querySelector(".paper-input-error").textContent.trim(),
      "Could not find account with that email"
    );

    await fillIn(".email > input", "some1@some.some");

    assert.equal(this.element.querySelector(".paper-input-error"), null);

    await click(".login-button");

    console.log(this.element.querySelector(".password > .md-input-messages-animation"));

    assert.equal(
      this.element
        .querySelector(".password > .md-input-messages-animation")
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

  test("should move to sign-up route after clicking on link", async function(assert) {
    assert.expect(2);

    await visit("/unauth/sign-in");

    assert.equal(currentURL(), "/unauth/sign-in", "starts in /unauth/sign-in");

    await click(".transition-link");

    assert.equal(currentURL(), "/unauth/sign-up", "ends in /unauth/sign-up");
  });
});
