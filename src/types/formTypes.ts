/*
The possible types of form data
*/
export type TFormRules = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  valueAsNumber?: boolean;
};

type TFormTextField = {
  type: "short" | "long";
  heading: string;
  placeholder?: string;
  formType: "textField";
  formId: string;
  rules: TFormRules;
};

type TFormPlainText = {
  type: "title";
  title: string;
  subtitle: string;
  formType: "textPlain";
  formId: string;
  rules: TFormRules;
};

type TFormMulti = {
  type: "multi";
  heading: string;
  options: string[];
  selected: Record<number, boolean>;
  formType: "textMulti";
  formId: string;
  rules: TFormRules;
};

export type TFormData = TFormMulti | TFormTextField | TFormPlainText;
/*
This type represent the form field data type usually passed in to react hook form's `useForm()` however since not creating the forms manually the type has be made this way.

{
  type: [contains the form component type name (abbreviations)]

  output: [contains what the expected output will be]

  formId: [an identifier that will act as the field name]

  ...requiredData : [data that the form itself needs e.g. placeholder, title, etc...]
}

[NOTE about `formId`]
formId is a identifier that is going to be used as field names inside the components itself. This is done so that we don't have to manually pass in label names. In the final result from the `submitHandler`, these formIds will then get mapped back to their original owner object.
*/

/**
 * String union of all the possible fields in IFormData
 */
export type TFormFields = Record<string, string | string[] | TFormFields[]>;
export type ExtractKeyValues<T> = T extends { [K: string]: unknown }
  ? keyof T
  : never;

// TestSchema.get``
