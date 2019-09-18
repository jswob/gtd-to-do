import { Factory } from "ember-cli-mirage";

export default Factory.extend({
  email(i) {
    return `some${i}@some.some`;
  },

  password() {
    return "Some123";
  }
});
