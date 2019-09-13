import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render, fillIn, click } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import { setupMirage } from "ember-cli-mirage/test-support";

module("Integration | Component | sign-up-form", function(hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test("should correctly validate form", async function(assert) {
    await render(hbs`<SignUpForm />`);

    await fillIn(".email > input", "somesome.some");

    await fillIn(".password > input", "Sompasd");

    await fillIn(".re-password > input", "Sompe");

    await click(".submit-button");

    assert.equal(
      this.element
        .querySelector(".email > .md-input-messages-animation")
        .textContent.trim(),
      "Email must be a valid email address"
    );

    assert.equal(
      this.element
        .querySelector(".password > .md-input-messages-animation")
        .textContent.trim(),
      "Password must include at least one upper case letter, one lower case letter, and a number"
    );

    assert.equal(
      this.element
        .querySelector(".re-password > .md-input-messages-animation")
        .textContent.trim(),
      "Password and repeat password must be equal"
    );

    await fillIn(".email > input", "some@some.some");

    await fillIn(".password > input", "So1");

    await fillIn(".re-password > input", "Some123");

    await click(".submit-button");

    assert.equal(
      this.element
        .querySelector(".password > .md-input-messages-animation")
        .textContent.trim(),
      "Password is too short (minimum is 6 characters)"
    );
  });
});
