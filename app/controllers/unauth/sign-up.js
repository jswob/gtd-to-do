import Controller from "@ember/controller";

export default Controller.extend({
  actions: {
    transitionAfterSignUp() {
      this.transitionToRoute("auth.collection");
    }
  }
});
