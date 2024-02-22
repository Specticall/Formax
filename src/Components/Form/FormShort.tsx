import IconBox from "../General/IconBox";
import { TextField } from "../StyledInputs/TextField";
import { FormComponentWrapper } from "./FormComponentWrapper";
import { useTextForm } from "../../Hooks/useTextForm";

interface IProps {
  heading: string;
  isEditing: boolean;
  placeholder?: string;
  formId: string;
}

/**
 * `Form Component` - `Short Text Input` :
 * Provides a one line text input that user can write to.
 *
 * @param heading - Plain text that will be displayed as the heading
 *
 * @param placeholder - Plain thext that will be displayed as the input placeholder.
 *
 * @param isEditing - Form state (read the comment on `<FormBuilder/>`)
 */
export function FormShort({
  heading = "Short Form Question",
  placeholder = "",
  formId: formLabel,
  isEditing = false,
}: IProps) {
  const { canSubmit, formRegister } = useTextForm({
    isEditing,
    name: formLabel,
  });

  return (
    <FormComponentWrapper disableHover={canSubmit} formKey={formLabel}>
      <div>
        <div className="flex items-center gap-4 mb-6">
          <IconBox>
            <i className="bx bx-text"></i>
          </IconBox>
          <div>
            <p className="text-main-300 text-body">Short Answer</p>
            <h2 className="text-main-400 text-heading">{heading}</h2>
          </div>
        </div>
        {canSubmit && formRegister ? (
          <TextField placeholder={placeholder} register={formRegister} />
        ) : (
          <TextField placeholder={placeholder} />
        )}
      </div>
    </FormComponentWrapper>
  );
}
