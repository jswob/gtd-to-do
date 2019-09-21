import Component from "@ember/component";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";
import { A } from "@ember/array";

export default Component.extend({
  store: service(),
  session: service(),

  rePasswordErrors: computed("user.password", "rePassword", function() {
    const password = this.get("user.password");
    const rePassword = this.get("rePassword");
    if (password === rePassword) return A([]);
    return A(["Password and repeat password must be equal"]);
  }),

  init() {
    this._super(...arguments);
    const user = this.store.createRecord("user");
    return this.set("user", user);
  },
  didDestroyElement() {
    return this.get("user").deleteRecord();
  },

  actions: {
    async createUser() {
      let user = this.get("user");
      try {
        if (
          user.get("email") &&
          user.get("password") &&
          this.get("rePasswordErrors")
        ) {
          await user.save();
          await this.session.authenticate("authenticator:token", {
            username: user.email,
            password: user.password
          });
          return this.get("transitionAfterSignUp")();
        }
      } catch (error) {
        return error;
      }
    }
  }
});
