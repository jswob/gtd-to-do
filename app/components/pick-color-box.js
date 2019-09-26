import Component from "@ember/component";
import { computed } from "@ember/object";

export default Component.extend({
  tagName: "",

  isActive: computed("selectedColor", "color", function() {
    if (this.get("selectedColor") === this.get("color")) return "active";
    return "";
  })
});
