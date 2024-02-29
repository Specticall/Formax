import { RegisterOptions } from "react-hook-form";
import { TFormData, TFormFields, TFormRules } from "../types/formTypes";

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
export function getFormRules(rules: TFormRules) {
  if (!rules || JSON.stringify(rules) === "{}") return;

  const reactHookFormRegisterOptions: RegisterOptions = {};

  Object.entries(rules).forEach((rule) => {
    const [ruleName, ruleValue] = rule;

    switch (ruleName) {
      case "required":
        if (typeof ruleValue !== "boolean") return;
        reactHookFormRegisterOptions[ruleName] = {
          value: ruleValue,
          message: "Field can't be empty",
        };
        break;
      case "minLength":
        if (typeof ruleValue !== "number") return;
        reactHookFormRegisterOptions[ruleName] = {
          value: ruleValue,
          message: `Filed must have atleast ${ruleValue} characters!`,
        };
        break;
      case "maxLength":
        if (typeof ruleValue !== "number") return;
        reactHookFormRegisterOptions[ruleName] = {
          value: ruleValue,
          message: `Filed can't have more than ${ruleValue} characters`,
        };
        break;
      case "valueAsNumber":
        throw new Error("Value as number is still WIP");
    }
  });

  return reactHookFormRegisterOptions;
}

export function swapByReference<T>(
  ref: T[],
  currentIndex: number,
  targetIndex: number
) {
  const temp = ref[targetIndex];
  ref[targetIndex] = ref[currentIndex];
  ref[currentIndex] = temp;
}

export function arrayInsertAt<T>(array: T[], targetIndex: number, item: T) {
  if (targetIndex > array.length)
    throw new Error("Target index is larger than the array length");

  const newArray = array.slice(0, targetIndex + 1);
  newArray[targetIndex] = item;
  newArray.push(...array.slice(targetIndex, array.length));

  return newArray;
}

export function isSameArray<T>(arr1: T[], arr2: T[]) {
  return arr1.every((item, index) => item === arr2[index]);
}
