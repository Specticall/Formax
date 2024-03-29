import IconBox from "../General/IconBox";
import { FormComponentWrapper } from "./FormComponentWrapper";
import { useTextForm } from "../../Hooks/useTextForm";
import { TFormRules } from "../../types/formTypes";

interface IProps {
  heading: string;
  isEditing: boolean;
  placeholder?: string;
  formId: string;
  rules: TFormRules;
}

/**
 * `Form Component` - `Long Text Input` :
 * Provides a multi line text input that user can write to.
 *
 * @param heading - Plain text that will be displayed as the heading
 *
 * @param placeholder - Plain thext that will be displayed as the input placeholder.
 *
 * @param isEditing - Form state (read the comment on `<FormBuilder/>`)
 *  @param rules - Object containing react hook form rules, will be used when form is operational.
 * @returns
 */
export function FormLong({
  heading,
  placeholder,
  isEditing,
  formId: formLabel,
  rules,
}: IProps) {
  const { formRegister, formMethods } = useTextForm({
    isEditing: isEditing,
    name: formLabel,
    rules,
  });

  const errorMessage = formMethods?.formState.errors[formLabel]
    ?.message as string;

  return (
    <FormComponentWrapper
      formKey={formLabel}
      disableHover={!isEditing}
      isEditing={isEditing}
    >
      <div>
        <div className="flex items-center gap-4 mb-6">
          <IconBox>
            <i className="bx bx-detail"></i>
          </IconBox>
          <div>
            <p className="text-main-300 text-body">Long Answer</p>
            <h2 className="text-main-400 text-heading">
              {heading || "Your Heading Here"}
            </h2>
          </div>
        </div>

        <textarea
          {...formRegister}
          className="resize-none bg-main-0 rounded-md border-[1px] border-border text-body px-5 py-3 placeholder:text-main-200 text-main-400 w-full h-[8rem]"
          style={{
            borderColor: errorMessage ? "rgb(255, 85, 146)" : "rgb(49, 49, 49)",
          }}
          placeholder={placeholder}
        ></textarea>
        {errorMessage && (
          <p className="text-danger text-end text-body mt-3">{errorMessage}</p>
        )}
      </div>
    </FormComponentWrapper>
  );
}
