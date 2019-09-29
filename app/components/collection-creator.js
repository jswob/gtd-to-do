import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default Component.extend({
  tagName: "",
  store: service(),

  init() {
    this._super(...arguments);
    const parent = this.get("parent");
    let collection;
    if (parent)
      collection = this.store.createRecord("collection", { parent: parent });
    else collection = this.store.createRecord("collection", {});
    return this.set("collection", collection);
  },
  didDestroyElement() {
    return this.get("collection").deleteRecord();
  },

  actions: {
    editCollection() {
      this.set("showDialog", false);
    },
    closeDialog() {
      this.set("showDialog", false);
    }
  }
});
