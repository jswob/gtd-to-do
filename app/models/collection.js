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
        max: 20
      }),
      validator("presence", true)
    ]
  },
  color: {
    description: "Color",
    validators: [validator("presence", true)]
  }
});

export default Model.extend(Validations, {
  label: attr("string"),
  color: attr("string"),
  childrens: hasMany("collection", { inverse: "parent" }),
  parent: belongsTo("collection", { inverse: "childrens" }),
  lists: hasMany("list"),
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
  ),

  colorErrors: computed(
    "errors.color.@each",
    "validations.attrs.color.errors.@each",
    function() {
      const color = this.get("color");
      const serverErrors = this.get("errors.color");
      const clientErrors = this.get("validations.attrs.color.errors");
      if (!color) return [];
      else if (serverErrors) return [serverErrors[0].message];
      else if (clientErrors.length) return [clientErrors[0].message];
      return [];
    }
  )
});
