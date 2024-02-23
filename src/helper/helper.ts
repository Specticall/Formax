import { IFormData, TFormFields } from "../types/formTypes";

export const COLOR_ACCENT = "#5451E1";

export type ExtractType<T> = T extends { type: infer U } ? U : never;

/**
 * This function creates a object that fulfills the shape of `useForm()`'s defaultValue object.
 * @param formData
 * @returns
 */
export function createDefaultValues(formData: IFormData[]): TFormFields {
  /*
  The type of this object can be: 
  
  <> normal string form : 
  Record<string, string> e.g. {name: "joseph", price: "900"}
  
  <> contain arrays:
  Record<string, string[]> e.g. {options: ["1", "5"], name: ""}

  // [LATER FEATURE]
  <> Contain a field value of itself (useFieldarray) 
  
  */
  const defaultValues: TFormFields = {};

  for (const data of formData) {
    const idAsFieldName = data.formId;

    if (data.output === "string") defaultValues[idAsFieldName] = "";

    if (data.output === "stringArray") defaultValues[idAsFieldName] = [];
  }

  return defaultValues;
}
