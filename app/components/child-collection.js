import Component from "@ember/component";
import { alias } from "@ember/object/computed";

export default Component.extend({
  classNames: ["child-collection"],
  classNameBindings: ["color"],

  color: alias("collection.color"),

  click() {
    const collection = this.get("collection");
    if (collection) this.set("selectedCollection", collection);
  },

  actions: {
    openEditorDialog() {
      this.set("showEditorDialog", true);
    },
    openDeleteDialog() {
      this.set("showDeleteDialog", true);
    },
    closeDeleteDialog() {
      this.set("showDeleteDialog", false);
    },
    deleteCollection() {
      const collection = this.get("collection");
      if (collection) collection.deleteRecord();
    }
  }
});
