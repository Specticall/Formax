import { TFormData, TFormFields } from "../types/formTypes";

export const COLOR_ACCENT = "#5451E1";

export type ExtractType<T> = T extends { type: infer U } ? U : never;

/**
 * This function creates a object that fulfills the shape of `useForm()`'s defaultValue object.
 * Will passed onto `useForm()`'s defautl value
 * @param formData
 * @returns
 */
export function createDefaultValues(formData: TFormData[]): TFormFields {
  const defaultValues: TFormFields = {};

  for (const data of formData) {
    const idAsFieldName = data.formId;

    if (data.formType === "textField" || data.formType === "textPlain")
      defaultValues[idAsFieldName] = "";

    if (data.formType === "textMulti") defaultValues[idAsFieldName] = [];
  }

  return defaultValues;
}
