import DS from "ember-data";
import { validator, buildValidations } from "ember-cp-validations";
import { computed } from "@ember/object";

const { Model, attr, hasMany } = DS;

const Validations = buildValidations({
  email: {
    description: "Email",
    validators: [
      validator("format", {
        type: "email"
      })
    ]
  },
  password: {
    description: "Password",
    validators: [
      validator("length", {
        min: 6,
        max: 15
      }),
      validator("format", {
        regex: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*$/,
        message:
          "Password must include at least one upper case letter, one lower case letter, and a number"
      })
    ]
  }
});

export default Model.extend(Validations, {
  email: attr("string"),
  password: attr("string"),
  collections: hasMany("collection"),
  lists: hasMany("list"),
  tasks: hasMany("tasks"),

  emailErrors: computed(
    "errors.email.@each",
    "validations.attrs.email.errors.@each",
    function() {
      const email = this.get("email");
      const serverErrors = this.get("errors.email");
      const clientErrors = this.get("validations.attrs.email.errors");
      if (!email) return [];
      else if (serverErrors) return [serverErrors[0].message];
      else if (clientErrors.length) return [clientErrors[0].message];
      return [];
    }
  ),

  passwordErrors: computed(
    "errors.password.@each",
    "validations.attrs.password.errors.@each",
    function() {
      const password = this.get("password");
      const serverErrors = this.get("errors.password");
      const clientErrors = this.get("validations.attrs.password.errors");
      if (!password) return [];
      else if (serverErrors) return [serverErrors[0].message];
      else if (clientErrors.length) return [clientErrors[0].message];
      return [];
    }
  )
});
