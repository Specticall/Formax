import { ChangeEventHandler, HTMLAttributes } from "react";
import { useAppDispatch, useAppSelector } from "./RTKHooks";
import { updateTextField } from "../slice/editorSlice";
import { TFormData } from "../types/formTypes";
import { ExtractKeyValues } from "../types/formTypes";

type TEditorProps = {
  formId?: string | null;
};

export type TEditorRegisterReturn = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  defaultValue: HTMLAttributes<HTMLInputElement>["defaultValue"];
};

export type TFormControl = {
  formId?: string | null;
  formData?: TFormData;
};

function getDefaultValue(
  formData: TFormData | undefined,
  field: ExtractKeyValues<TFormData>
) {
  if (!formData) return "";

  switch (formData.formType) {
    case "textField":
      if (field !== "heading" && field !== "placeholder") break;
      return formData[field] || "";
    case "textPlain":
      if (field !== "title" && field !== "subtitle") break;
      return formData[field] || "";
    case "textMulti":
      if (field !== "heading") break;
      return formData[field] || "";
    default:
      throw new Error(`Can't assign a value to field : ${field}`);
  }
}
/*
      | keyof Extract<TFormData, { formType: "textField" }>
      | keyof Extract<TFormData, { formType: "textPlain" }>
*/

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
  });

  function register(
    fieldType: ExtractKeyValues<TFormData>
  ): TEditorRegisterReturn {
    return {
      /*
      Returns an onChange listener that updates the editor store everytime the user changes the input field
      */
      onChange(e) {
        if (!formId) throw new Error(`Form id for field ${fieldType} is null`);
        if (formData?.formType === "textMulti") return;
        dispatch(
          updateTextField({ value: e.target.value, formId, field: fieldType })
        );
      },

      /*
      Retrieves the data on the object and treat it as the default value
      */
      defaultValue: getDefaultValue(formData, fieldType),
    };
  }

  /**
   * Similar to react hook form's control. Allows other editor hooks to have the same data as useEditor e.g. formId
   */
  const control: TFormControl = { formId, formData };

  return { register, control };
}
