import { ChangeEventHandler, HTMLAttributes } from "react";
import { useAppDispatch, useAppSelector } from "./RTKHooks";
import { TFormFieldNames, watchField } from "../slice/editorSlice";

type TEditorProps = {
  formId?: string | null;
};

export type TEditorRegisterReturn = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  defaultValue: HTMLAttributes<HTMLInputElement>["defaultValue"];
};

/**
 * Basically a remake of react hook form. We're creating our own version because we need it to be customizable. This hook is specifically designed to work with forms inside the editor property.
 *
 * @param formId - Used to identify form inside the reducer.
 * @returns
 */
export function useEditor({ formId }: TEditorProps) {
  const dispatch = useAppDispatch();

  // TEMP -> Should use an action creator for this.
  const formData = useAppSelector((state) => {
    return state.editor.formData?.find((data) => data.formId === formId);
  }) as Record<string, string | string[]>;

  function register(fieldType: TFormFieldNames): TEditorRegisterReturn {
    return {
      /*
      Returns an onChange listener that updates the editor store everytime the user changes the input field
      */
      onChange(e) {
        if (!formId) throw new Error(`Form id for field ${fieldType} is null`);
        dispatch(
          watchField({ value: e.target.value, formId, field: fieldType })
        );
      },

      /*
      Retrieves the data on the object and treat it as the default value
      */
      defaultValue: formData[fieldType] || "",
    };
  }

  return { register };
}
