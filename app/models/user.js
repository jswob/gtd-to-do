import DS from "ember-data";
import { validator, buildValidations } from "ember-cp-validations";

const { Model, attr } = DS;

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
  password: attr("string")
});
