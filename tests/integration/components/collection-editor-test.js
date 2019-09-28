import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render, fillIn, click, pauseTest } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import $ from "jquery";

module("Integration | Component | collection-editor", function(hooks) {
  setupRenderingTest(hooks);

  test("should correctly validate collection label", async function(assert) {
    const collection = this.owner
      .lookup("service:store")
      .createRecord("collection", { label: "test", color: "red" });

    this.set("collection", collection);
    this.set("showDialog", true);

    await render(
      hbs`<CollectionEditor @showDialog={{this.showDialog}} @collection={{this.collection}} />`
    );

    await fillIn("input", "some very long text that can't be collection label");

    await click(".edit-button");

    assert.equal(
      $(".paper-input-error")
        .text()
        .trim(),
      "Label is too long (maximum is 20 characters)"
    );
  });

  test("Edit button should by disabled if collection data was not updated", async function(assert) {
    assert.expect(5);

    const collection = this.owner
      .lookup("service:store")
      .createRecord("collection", { label: "test", color: "red" });

    this.set("collection", collection);
    this.set("showDialog", true);

    await render(
      hbs`<CollectionEditor @showDialog={{this.showDialog}} @collection={{this.collection}} />`
    );

    assert.ok(
      $(".edit-button").prop("disabled"),
      "on start edit-button is disabled"
    );

    await fillIn("input", "testt");

    assert.notOk(
      $(".edit-button").prop("disabled"),
      "after changing label button becomes active"
    );

    await fillIn("input", "test");

    assert.ok(
      $(".edit-button").prop("disabled"),
      "after restoration of older version of label button becomes inactive"
    );

    await click(".yellow");

    assert.notOk(
      $(".edit-button").prop("disabled"),
      "after switching colors button becomes active"
    );

    await click(".red");

    assert.ok(
      $(".edit-button").prop("disabled"),
      "after restoration of older version of color button becomes inactive"
    );
  });

  test("should disappear after clicking on cancel button", async function(assert) {
    assert.expect(2);

    const collection = this.owner
      .lookup("service:store")
      .createRecord("collection", { label: "test", color: "red" });

    this.set("collection", collection);
    this.set("showDialog", true);

    await render(
      hbs`<CollectionEditor @showDialog={{this.showDialog}} @collection={{this.collection}} />`
    );

    assert.ok($(".collection-editor").length, "component was rendered");

    await click(".cancel-button");

    assert.notOk(
      $(".collection-editor").length,
      "after clicking on cancel-button component disappear"
    );
  });
});
