import DS from "ember-data";
import { validator, buildValidations } from "ember-cp-validations";
import { computed } from "@ember/object";

const { Model, attr, hasMany, belongsTo } = DS;

const Validations = buildValidations({
  label: {
    description: "Label",
    validators: [
      validator("length", {
        min: 1,
        max: 15
      })
    ]
  }
});

export default Model.extend(Validations, {
  label: attr("string"),
  tasks: hasMany("task"),
  collection: belongsTo("collection"),
  owner: belongsTo("user"),

  labelErrors: computed(
    "errors.label.@each",
    "validations.attrs.label.errors.@each",
    function() {
      const label = this.get("label");
      const serverErrors = this.get("errors.label");
      const clientErrors = this.get("validations.attrs.label.errors");
      if (!label) return [];
      else if (serverErrors) return [serverErrors[0].message];
      else if (clientErrors.length) return [clientErrors[0].message];
      return [];
    }
  )
});
