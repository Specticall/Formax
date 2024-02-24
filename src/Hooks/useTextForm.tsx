import {
  RegisterOptions,
  UseFormRegisterReturn,
  useFormContext,
} from "react-hook-form";
import { useOperationalForm } from "../Context/OperationalFormContext";
import { TFormRules } from "../types/formTypes";

interface IProps {
  isEditing: boolean;
  name: string | undefined;
  rules: TFormRules;
}

/**
 * Handles the logic for registering an input to react hook form. This custom hook is used when we want to create a form component that has a singular `string` field.
 * @param param0
 * @returns `formMethods` - Contains the methods returned by the `useForm()` hook.
 *
 * @returns `defaultValues` . Contains the default value registered at the top level component. Used to provide an initial value to the forms.
 *
 * @returns `canSubmit` - Will flag `true` if the hook successfuly connects to to react hook form. This property however is still a WIP and is not complete, user might still have to provide extra reassurance to typescript inorder to render certain props. Check the example on the `<FormShort/>` component
 *
 * @returns `formRegister` - contains functions that are returned when calling `register("label")`
 */
export function useTextForm({ isEditing, name, rules }: IProps) {
  // We don't use destructuring here because we would not be able to check if these context exist or not which can lead to runtime error
  const formValues = useOperationalForm();
  const formMethods = useFormContext() || null;

  // Passed in react hook form so it can infer the correc types
  const defaultValues = formValues?.defaultValues;

  // Memoise the rules object to only recalculate every time rule changes.
  const formRules = getFormRules(rules);

  // This will "Hook" the register function to the label name if possible
  const formRegister: UseFormRegisterReturn<string> | object =
    formMethods && name ? formMethods.register(name, formRules) : {};

  // True when the required props for an active form are passed in.
  const canSubmit =
    defaultValues &&
    formMethods &&
    !isEditing &&
    JSON.stringify(formRegister) !== "{}";

  return {
    formMethods: !formMethods ? undefined : formMethods,
    defaultValues,
    canSubmit,
    formRegister,
  };
}

function getFormRules(rules: TFormRules) {
  if (!rules || JSON.stringify(rules) === "{}") return;

  const reactHookFormDefaultValues: RegisterOptions = {};

  Object.entries(rules).forEach((rule) => {
    const [ruleName, ruleValue] = rule;

    switch (ruleName) {
      case "required":
        if (typeof ruleValue !== "boolean") return;
        reactHookFormDefaultValues[ruleName] = {
          value: ruleValue,
          message: "Field can't be empty",
        };
        break;
      case "minLength":
        if (typeof ruleValue !== "number") return;
        reactHookFormDefaultValues[ruleName] = {
          value: ruleValue,
          message: `Filed must have atleast ${ruleValue} characters!`,
        };
        break;
      case "maxLength":
        if (typeof ruleValue !== "number") return;
        reactHookFormDefaultValues[ruleName] = {
          value: ruleValue,
          message: `Filed can't have more than ${ruleValue} characters`,
        };
        break;
      case "valueAsNumber":
        throw new Error("Value as number is still WIP");
    }
  });

  return reactHookFormDefaultValues;
}
