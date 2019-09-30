import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render, click } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";
import $ from "jquery";

module("Integration | Component | child-collection", function(hooks) {
  setupRenderingTest(hooks);

  test("should has correct label and color class", async function(assert) {
    assert.expect(2);

    const collection = this.owner
      .lookup("service:store")
      .createRecord("collection", { label: "test", color: "red" });

    this.set("collection", collection);

    await render(hbs`<ChildCollection @collection={{this.collection}} />`);

    assert.equal(
      this.element.querySelector(".child-collection-title").textContent.trim(),
      "test",
      "Title is correct"
    );

    assert.ok(
      this.element
        .querySelector(".child-collection")
        .classList.value.includes(collection.get("color")),
      "Color class is correct"
    );
  });

  test("should show menu on click", async function(assert) {
    assert.expect(1);

    await render(hbs`<ChildCollection />`);

    await click(".child-collection > .menu");

    assert.equal($(".paper-menu > item").length, 2, "menu has 2 items");
  });

  test("should display warning message when user tries to delete a collection", async function(assert) {
    assert.expect(4);

    const collection = this.owner
      .lookup("service:store")
      .createRecord("collection", { label: "test", color: "red" });

    this.set("collection", collection);

    await render(hbs`<ChildCollection @collection={{this.collection}} />`);

    await click(".child-collection > .menu");

    await click(".child-collection > .menu > delete-button");

    assert.equal(
      $(".delete-collection-warning-message > .title")
        .text()
        .trim(),
      "Usuwanie podzbioru",
      "title is correct"
    );

    assert.equal(
      $(".delete-collection-warning-message > .content")
        .text()
        .trim(),
      `Jesteś pewien że chcesz usunąć podzbiór "${collection.get(
        "label"
      )}" wraz z jego wszystkimi elementami`,
      "content is correct is correct"
    );

    await click(".delete-collection-warning-message > .cancel-button");

    assert.equal(
      $(".delete-collection-warning-message").length,
      1,
      "after clicking on cancel button warning box disappear"
    );

    await click(".child-collection > .menu");

    await click(".child-collection > .menu > delete-button");

    await click(".delete-collection-warning-message > .delete-button");

    assert.notOk(
      this.get("collection"),
      "after clicking on delete button collection model is deleted"
    );
  });

  test("should display edition box when user tries to edit a collection", async function(assert) {
    assert.expect(1);

    const collection = this.owner
      .lookup("service:store")
      .createRecord("collection", { label: "test", color: "red" });

    this.set("collection", collection);

    await render(hbs`<ChildCollection @collection={{this.collection}} />`);

    await click(".child-collection > .menu");

    await click(".child-collection > .menu > edit-button");

    assert.equal($(".collection-editor").length, 1);
  });

  test("should return collection on click", async function(assert) {
    assert.expect(1);

    const collection = this.owner
      .lookup("service:store")
      .createRecord("collection", { label: "test", color: "red" });

    this.set("collection", collection);
    this.set("selectedCollection", {});

    await render(
      hbs`<ChildCollection @selectedCollection={{this.selectedCollection}} @collection={{this.collection}} />`
    );

    await click(".child-collection");

    assert.equal(this.get("selectedCollection"), collection);
  });
});
