import { FormComponentWrapper } from "./FormComponentWrapper";

interface IProps {
  title: string;
  subtitle: string;
  isEditing: boolean;
  formId: string;
}

/**
 * `Form Component` - `Plain Text Title :
 * Provides a title and a subtitle users can customize to display plain text.
 *
 * @param title - Plain text that will be displayed as the title
 *
 * @param subtitle - Plain thext that will be displayed as the subtitle.
 *
 * @param isEditing - Form state (read the comment on `<FormBuilder/>`)
 * @returns
 */
export function FormTitle({
  title = "Title Here",
  subtitle = "Insert You New Subtitle Here",
  formId,
  isEditing = false,
}: IProps) {
  return (
    <FormComponentWrapper
      formKey={formId}
      disableHover={!isEditing}
      isEditing={isEditing}
    >
      <div className="flex justify-between">
        <h1 className="text-title text-main-400 mb-1">
          {title || "Your Title Here"}
        </h1>
      </div>
      <p className="text-body text-main-200">
        {subtitle || "Your Subtitle Here"}
      </p>
    </FormComponentWrapper>
  );
}
