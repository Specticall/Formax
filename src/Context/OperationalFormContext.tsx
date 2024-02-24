import { ReactNode, createContext, useContext } from "react";
import { TFormFields } from "../types/formTypes";

interface IOperationalFormContext {
  defaultValues: TFormFields;
}

interface IProviderProps {
  children: ReactNode;
  defaultValues: TFormFields;
}
const OperationalFormContext = createContext<IOperationalFormContext | null>(
  null
);
/**
 * A context used to pass down default values to the input components. defaultValues are used by the input components to infer the form field type (usually declared manually).
 *
 * To avoid prop drilling this to each input components, we use a context.
 *
 * @param defaultValues - Form default values, usually used together with the `createDefaultValues()` fucntion
 *
 * @returns
 */
export function OperationalFormProvider({
  children,
  defaultValues,
}: IProviderProps) {
  return (
    <OperationalFormContext.Provider value={{ defaultValues }}>
      {children}
    </OperationalFormContext.Provider>
  );
}

/**
 * Used to retrieve values from the OperationalFormProvider. If this hook is used outside the provider's scope, it will return null instead of throwing to we can handle it in the component.
 *
 * defaultValues are used conditionally, if used for operational purposes (preview / publish) we would need the default values to run react hook form. But if we only use this for display, then we don't need them.
 *
 * @returns values passed from the parent component, usually default values
 */
export function useOperationalForm(): IOperationalFormContext | null {
  const context = useContext(OperationalFormContext);
  return !context ? null : context;
}
