import Component from "@ember/component";
import { inject as service } from "@ember/service";

export default Component.extend({
  session: service(),
  store: service(),

  init() {
    this._super(...arguments);
    const user = this.store.createRecord("user");
    return this.set("user", user);
  },
  didDestroyElement() {
    return this.get("user").deleteRecord();
  },

  actions: {
    async signIn() {
      const user = this.get("user");
      try {
        await this.session.authenticate("authenticator:token", {
          username: user.email,
          password: user.password
        });
        await this.transitionAfterSignIn();
      } catch (e) {
        if (e.status === 422) {
          const error = e.json.errors[0];
          const pointer = error.source.pointer.split("/")[2];
          if (pointer === "email") {
            this.get("user.validations.attrs.email.errors").pushObject({
              message: error.detail
            });
            this.get("user.validations.attrs.email.errors");
          } else if (pointer === "password") {
            this.get("user.validations.attrs.password.errors").pushObject({
              message: error.detail
            });
            this.get("user.validations.attrs.password.errors");
          }
        }
      }
    }
  }
});
