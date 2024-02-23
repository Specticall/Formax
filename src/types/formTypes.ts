/*
The possible types of form data
*/
type TFormShort = {
  type: "short";
  heading: string;
  placeholder?: string;
  output: "string";
  formType: "textField";
};
type TFormTitle = {
  type: "title";
  title: string;
  subtitle: string;
  output: "string";
  formType: "textPlain";
};
type TFormLong = {
  type: "long";
  heading: string;
  placeholder?: string;
  output: "string";
  formType: "textField";
};
type TFormMulti = {
  type: "multi";
  heading: string;
  options: string[];
  selected: Record<number, boolean>;
  output: "stringArray";
  formType: "textMulti";
};

export type IFormData = { formId: string } & (
  | TFormTitle
  | TFormShort
  | TFormLong
  | TFormMulti
);

/**
 * These are extracted data types used to narrow the typescript type checker. Mostly used with keyof to retrieve the keys similar values.
 *
 */

export type TTextField = Extract<IFormData, { formType: "textField" }>;
export type TTextPlain = Extract<IFormData, { formType: "textPlain" }>;
export type TMultiField = Extract<IFormData, { formType: "textMulti" }>;

// Extract field names from each type in the union
type FieldNames<T> = T extends { [key: string]: unknown } ? keyof T : never;
// Extract field names from all types in the union and combine them into a single union type
/*
Used to "alleviate" issues of not typing the IFormData indexing properly (we're using a temporary solution with any and some typecasting). With this we can atleast avoid any potential typos.
*/

export type TFormFieldNames = Exclude<
  FieldNames<IFormData>,
  "type" | "ouput" | "formId"
>;
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
export interface IEditor {
  selectedForm: IFormData | null;
  formData: IFormData[] | null;
}
