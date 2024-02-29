import IconBox from "../General/IconBox";
import { TextField } from "../StyledInputs/TextField";
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
 * `Form Component` - `Short Text Input` :
 * Provides a one line text input that user can write to.
 *
 * @param heading - Plain text that will be displayed as the heading
 *
 * @param placeholder - Plain thext that will be displayed as the input placeholder.
 *
 * @param rules - Object containing react hook form rules, will be used when form is operational.
 * @param isEditing - Form state (read the comment on `<FormBuilder/>`)
 */
export function FormShort({
  heading = "Short Form Question",
  placeholder = "",
  formId: formLabel,
  isEditing = false,
  rules,
}: IProps) {
  const { canSubmit, formRegister, formMethods } = useTextForm({
    isEditing,
    name: formLabel,
    rules,
  });

  const formErrors = formMethods?.formState.errors;

  return (
    <FormComponentWrapper
      disableHover={canSubmit}
      formKey={formLabel}
      isEditing={isEditing}
    >
      <div>
        <div className="flex items-center gap-4 mb-6">
          <IconBox>
            <i className="bx bx-text"></i>
          </IconBox>
          <div>
            <p className="text-main-300 text-body">Short Answer</p>
            <h2 className="text-main-400 text-heading">
              {heading || "Your Heading Here"}
            </h2>
          </div>
        </div>
        {canSubmit && formRegister ? (
          <TextField
            placeholder={placeholder}
            register={formRegister}
            errorMessage={formErrors?.[formLabel]?.message as string}
          />
        ) : (
          <TextField placeholder={placeholder} />
        )}
      </div>
    </FormComponentWrapper>
  );
}
