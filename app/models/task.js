import DS from "ember-data";
import { validator, buildValidations } from "ember-cp-validations";
import { computed } from "@ember/object";

const { Model, attr, belongsTo } = DS;

const Validations = buildValidations({
  description: {
    description: "Description",
    validators: [
      validator("length", {
        min: 1,
        max: 50
      })
    ]
  }
});

export default Model.extend(Validations, {
  description: attr("string"),
  isDone: attr("boolean"),
  list: belongsTo("list"),
  owner: belongsTo("user"),

  descriptionErrors: computed(
    "errors.description.@each",
    "validations.attrs.description.errors.@each",
    function() {
      const description = this.get("description");
      const serverErrors = this.get("errors.description");
      const clientErrors = this.get("validations.attrs.description.errors");
      if (!description) return [];
      else if (serverErrors) return [serverErrors[0].message];
      else if (clientErrors.length) return [clientErrors[0].message];
      return [];
    }
  )
});
