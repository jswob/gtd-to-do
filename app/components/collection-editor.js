import Component from "@ember/component";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";

export default Component.extend({
  tagName: "",
  store: service(),

  init() {
    this._super(...arguments);
    const collection = this.store.createRecord(
      "collection",
      this.get("collection")
    );
    return this.set("collectionCopy", collection);
  },
  didDestroyElement() {
    return this.get("collectionCopy").deleteRecord();
  },

  isModified: computed(
    "collection.{label,color}",
    "collectionCopy.{label,color}",
    function() {
      const collection = this.get("collection");
      const copy = this.get("collectionCopy");
      if (
        collection.get("label") === copy.get("label") &&
        collection.get("color") === copy.get("color")
      )
        return true;
      return false;
    }
  ),

  actions: {
    editCollection() {
      this.set("showDialog", false);
    },
    closeDialog() {
      this.set("showDialog", false);
    }
  }
});
