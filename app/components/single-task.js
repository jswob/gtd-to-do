import Component from "@ember/component";
import { computed } from "@ember/object";

export default Component.extend({
  classNames: ["single-task"],
  classNameBindings: ["done"],
  done: computed("task.isDone", function() {
    if (this.get("task.isDone")) return true;
    return false;
  })
});
