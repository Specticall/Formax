import IconBox from "../General/IconBox";
import { FormComponentWrapper } from "./FormComponentWrapper";
import { useTextForm } from "../../Hooks/useTextForm";

interface IProps {
  heading: string;
  isEditing: boolean;
  placeholder?: string;
  formId: string;
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
 *
 * @returns
 */
export function FormLong({
  heading,
  placeholder,
  isEditing,
  formId: formLabel,
}: IProps) {
  const { formRegister } = useTextForm({
    isEditing: isEditing,
    name: formLabel,
  });

  return (
    <FormComponentWrapper formKey={formLabel} disableHover={!isEditing}>
      <div>
        <div className="flex items-center gap-4 mb-6">
          <IconBox>
            <i className="bx bx-detail"></i>
          </IconBox>
          <div>
            <p className="text-main-300 text-body">Long Answer</p>
            <h2 className="text-main-400 text-heading">{heading}</h2>
          </div>
        </div>
        <textarea
          {...formRegister}
          className="resize-none bg-main-0 rounded-md border-[1px] border-border text-body px-5 py-3 placeholder:text-main-200 text-main-400 w-full h-[8rem]"
          placeholder={placeholder}
        ></textarea>
      </div>
    </FormComponentWrapper>
  );
}
