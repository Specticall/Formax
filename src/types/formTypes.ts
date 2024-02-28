/*
The possible types of form data
*/
export type TFormRules = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  valueAsNumber?: boolean;
};

export type TFormTextField = {
  type: "short" | "long";
  heading: string;
  placeholder?: string;
  formType: "textField";
  formId: string;
  rules: TFormRules;
};

export type TFormPlainText = {
  type: "title";
  title: string;
  subtitle: string;
  formType: "textPlain";
  formId: string;
  rules: TFormRules;
};

export type TFormMulti = {
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

/**This types will take an object then return a union of all the key value that has the type string in it.

const object = { a : 12, b : true, c : "hello", d: "world" }

1. Create a new object tyle 
-> { [K in keyof T]: T[K] }
  = { a : 12, b : true, c : "hello", d: "world" }
  
2. Checks if the value of the object is string, if no return `never`
-> { [K in keyof T]: T[K] extends string ? "success" : never }
  = { a : never, b : never, c : "success", d : "success" }
  
3. If succeed then we take the key value itself then assign it to the value
-> { [K in keyof T]: T[K] extends string ? K : never }
  = { a : never, b : never, c : "c", d : "d" }

4. Lastly, we then create a value union of all the types created. Never is excluded because the never type treats the type as if it does not exist.
-> { [K in keyof T]: T[K] extends string ? K : never }[keyof T]
  = "c" | "d"
 */
export type ExtractStringOnlyFrom<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

// eslint-disable-next-line
export type TODO = any;
