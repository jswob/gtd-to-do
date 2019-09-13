import { module, test } from "qunit";
import { visit, currentURL, fillIn, click } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";
import { authenticateSession } from "ember-simple-auth/test-support";
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
});
