import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render, click } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | pick-color-box", function(hooks) {
  setupRenderingTest(hooks);

  test("should change color after click", async function(assert) {
    this.set("color", "red");
    this.set("selectedColor", "yellow");
    this.set("someAction", color => {
      this.set("selectedColor", color);
    });

    await render(
      hbs`<PickColorBox @selectColor={{action someAction}} @selectedColor={{this.selectedColor}}  @color={{this.color}} />`
    );

    assert.equal(this.get("selectedColor"), "yellow", "starts with yellow");

    await click(".red");

    assert.equal(
      this.get("selectedColor"),
      "red",
      "after click selected color is red"
    );
  });

  test("should set active after click", async function(assert) {
    this.set("color", "red");
    this.set("selectedColor", "yellow");
    this.set("selectColor", function(color) {
      this.set("selectedColor", color);
    });

    await render(
      hbs`<PickColorBox @selectColor={{action selectColor}} @selectedColor={{this.selectedColor}}  @color={{this.color}} />`
    );

    assert.notOk(
      this.element.querySelector(".red").classList.value.includes("active"),
      "starts as unactive"
    );

    await click(".red");

    assert.ok(
      this.element.querySelector(".red").classList.value.includes("active"),
      "after click element is active"
    );
  });
});
