import { module, test } from "qunit";
import { setupTest } from "ember-qunit";
import { run } from "@ember/runloop";

module("Unit | Model | task", function(hooks) {
  setupTest(hooks);

  test("should dynamically update errors arrays", async function(assert) {
    assert.expect(2);
    let store = this.owner.lookup("service:store");
    let task = store.createRecord("task", {});

    await run(() =>
      task.set(
        "description",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam velit nulla, accumsan nec enim quis, luctus maximus dui. Maecenas dolor purus, vulputate bibendum consequat eu, aliquet quis tortor. Donec dignissim cursus enim eu pulvinar. Aliquam non posuere dui. Duis vitae nisi scelerisque, rhoncus nulla at, auctor tortor. Integer nec ultrices felis. Nunc laoreet nisi nec sapien auctor, sit amet dictum ante pharetra. Phasellus et blandit erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam velit nulla, accumsan nec enim quis, luctus maximus dui. Maecenas dolor purus, vulputate bibendum consequat eu, aliquet quis tortor. Donec dignissim cursus enim eu pulvinar. Aliquam non posuere dui. Duis vitae nisi scelerisque, rhoncus nulla at, auctor tortor. Integer nec ultrices felis. Nunc laoreet nisi nec sapien auctor, sit amet dictum ante pharetra. Phasellus et blandit erat."
      )
    );
    assert.equal(task.get("descriptionErrors").length, 1);
    await run(() => task.set("description", "Some valid text"));
    assert.equal(task.get("descriptionErrors").length, 0);
  });
});
