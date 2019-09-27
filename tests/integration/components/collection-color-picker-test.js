import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render, click } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | collection-color-picker", function(hooks) {
  setupRenderingTest(hooks);

  const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue-green",
    "blue",
    "violet",
    "red-violet",
    "light-brown"
  ];

  test("should have a correct label", async function(assert) {
    assert.expect(1);

    await render(hbs`<CollectionColorPicker />`);

    assert.equal(
      this.element.querySelector(".title").textContent.trim(),
      "Edytuj kolor"
    );
  });

  test("should show a list of 9 colors", async function(assert) {
    assert.expect(9);

    await render(hbs`<CollectionColorPicker />`);

    const pickColorBoxes = this.element.querySelectorAll(".pick-color-box");

    for (let i = 0; i < colors.length; i++) {
      assert.ok(pickColorBoxes[i].classList.value.includes(colors[i]));
    }
  });

  test("should return selected color after click", async function(assert) {
    assert.expect(10);

    await render(hbs`<CollectionColorPicker @selectedColor={{this.color}} />`);
    
    assert.equal(this.get("color"), "red", "starts with red");

    for (let i = 8; i >= 0; i--) {
      await click(`.${colors[i]}`);
      assert.equal(
        this.get("color"),
        colors[i],
        `after click selected color is ${colors[i]}`
      );
    }
  });

  test("should change active pick-color-box after click", async function(assert) {
    assert.expect(10);

    await render(hbs`<CollectionColorPicker @selectedColor={{this.color}} />`);

    assert.ok(
      this.element.querySelector(".red").classList.value.includes("active"),
      "starts with red"
    );

    for (let i = 8; i >= 0; i--) {
      await click(`.${colors[i]}`);
      assert.ok(
        this.element
          .querySelector(`.${colors[i]}`)
          .classList.value.includes("active"),
        `${colors[i]} box is active`
      );
    }
  });
});
