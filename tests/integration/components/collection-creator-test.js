import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render, fillIn, click } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import $ from "jquery";

module("Integration | Component | collection-creator", function(hooks) {
  setupRenderingTest(hooks);

  test("should show correct layout for main-collection", async function(assert) {
    assert.expect(2);

    this.set("showDialog", true);

    await render(hbs`<CollectionCreator @showDialog={{this.showDialog}} />`);

    assert.equal(
      $(".form-title")
        .text()
        .trim(),
      "Stwórz zbiór",
      "title is correct"
    );

    assert.notOk($(".warning-wrapper").length, "ther is no warning message");
  });

  test("should show correct layout for subcollection", async function(assert) {
    assert.expect(2);

    this.set("parent", { id: 0, label: "test", color: "red" });
    this.set("showDialog", true);

    await render(
      hbs`<CollectionCreator @showDialog={{this.showDialog}} @parent={{this.parent}} />`
    );

    assert.equal(
      $(".form-title")
        .text()
        .trim(),
      "Stwórz podzbiór",
      "title is correct"
    );

    assert.ok($(".warning-wrapper").length, "ther is warning message");
  });

  test("should correctly validate label property", async function(assert) {
    assert.expect(1);

    this.set("showDialog", true);

    await render(hbs`<CollectionCreator @showDialog={{this.showDialog}} />`);

    await fillIn("input", "some very long text that can't be collection label");

    await click(".submit-button");

    assert.equal(
      $(".paper-input-error")
        .text()
        .trim(),
      "Label is too long (maximum is 20 characters)"
    );
  });

  test("should disappear after clicking on cancel button", async function(assert) {
    assert.expect(2);

    this.set("showDialog", true);

    await render(hbs`<CollectionCreator @showDialog={{this.showDialog}} />`);

    assert.ok($(".collection-editor").length, "component was rendered");

    await click(".cancel-button");

    assert.notOk(
      $(".collection-editor").length,
      "after clicking on cancel-button component disappear"
    );
  });
});
