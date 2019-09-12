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
      validator("format", {
        regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/,
        message:
          "Password must include at least one upper case letter, one lower case letter, and a number"
      }),
      validator("length", {
        min: 6,
        max: 15
      })
    ]
  }
});

export default Model.extend(Validations, {
  email: attr("string"),
  password: attr("string")
});
