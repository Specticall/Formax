import { UseFormRegisterReturn, useFormContext } from "react-hook-form";
import { useOperationalForm } from "../Context/OperationalFormContext";

interface IProps {
  isEditing: boolean;
  name: string | undefined;
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
export function useTextForm({ isEditing, name }: IProps) {
  // We don't use destructuring here because we would not be able to check if these context exist or not which can lead to runtime error
  const formValues = useOperationalForm();
  const formMethods = useFormContext();

  const defaultValues = formValues?.defaultValues;

  // This will "Hook" the register function to the label name if possible
  const formRegister: UseFormRegisterReturn<string> | object =
    formMethods && name ? formMethods.register(name) : {};

  // True when the required props for an active form are passed in.
  const canSubmit =
    defaultValues &&
    formMethods &&
    !isEditing &&
    JSON.stringify(formRegister) !== "{}";

  return { formMethods, defaultValues, canSubmit, formRegister };
}
