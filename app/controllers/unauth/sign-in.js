import Controller from "@ember/controller";

export default Controller.extend({
  actions: {
    transitionAfterSignIn() {
      this.transitionToRoute("auth.collection");
    }
  }
});
