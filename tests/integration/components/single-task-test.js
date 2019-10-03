import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render, click } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | single-task", function(hooks) {
  setupRenderingTest(hooks);

  test("should correctly display data", async function(assert) {
    assert.expect(2);

    const task = this.owner
      .lookup("service:store")
      .createRecord("task", { description: "some dummy text", isDone: false });

    this.set("task", task);

    await render(hbs`<SingleTask @task={{this.task}} />`);

    assert.equal(
      this.element.querySelector(".description").textContent.trim(),
      "some dummy text"
    );

    assert.notOk(
      this.element
        .querySelector(".single-task")
        .classList.value.includes("done")
    );
  });

  test("should mark the task done after click", async function(assert) {
    assert.expect(1);

    const task = this.owner
      .lookup("service:store")
      .createRecord("task", { description: "some dummy text", isDone: false });

    this.set("task", task);

    await render(hbs`<SingleTask @task={{this.task}} />`);

    await click(".checkbox");

    assert.ok(
      this.element
        .querySelector(".single-task")
        .classList.value.includes("done")
    );
  });
});
