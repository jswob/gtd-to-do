import Component from "@ember/component";
import { A } from "@ember/array";

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);
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
    this.set("colors", A(colors));
  },

  didRender() {
    this._super(...arguments);
    if (!this.get("selectedColor"))
      this.set("selectedColor", this.get("colors")[0]);
  },

  actions: {
    selectColor(color) {
      this.set("selectedColor", color);
    }
  }
});
