import { module, test } from "qunit";
import { setupTest } from "ember-qunit";
import { run } from "@ember/runloop";

module("Unit | Model | collection", function(hooks) {
  setupTest(hooks);

  test("should dynamically update errors arrays", async function(assert) {
    let store = this.owner.lookup("service:store");
    let collection = store.createRecord("collection", {});

    await run(() =>
      collection.set("label", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam velit nulla, accumsan nec enim quis, luctus maximus dui. Maecenas dolor purus, vulputate bibendum consequat eu, aliquet quis tortor. Donec dignissim cursus enim eu pulvinar. Aliquam non posuere dui. Duis vitae nisi scelerisque, rhoncus nulla at, auctor tortor. Integer nec ultrices felis. Nunc laoreet nisi nec sapien auctor, sit amet dictum ante pharetra. Phasellus et blandit erat.")
    );
    assert.equal(collection.get("labelErrors").length, 1);
    await run(() => collection.set("label", "Some valid text"));
    assert.equal(collection.get("labelErrors").length, 0);

    await run(() =>
      collection.set("color", null)
    );
    // assert.equal(collection.get("colorErrors").length, 1);
    // await run(() => collection.set("color", "black"));
    assert.equal(collection.get("colorErrors").length, 0);
  });
});
