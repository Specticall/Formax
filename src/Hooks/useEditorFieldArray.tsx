import { ChangeEventHandler, HTMLAttributes } from "react";
import { addArrayField, updateArrayField } from "../slice/editorSlice";
import { useAppDispatch } from "./RTKHooks";
import { TFormControl } from "./useEditor";
import { TMultiField } from "../types/formTypes";

export type TEditorRegisterFieldArrayReturn = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  defaultValue: HTMLAttributes<HTMLInputElement>["defaultValue"];
};

export function useEditorFieldArray({
  name,
  control,
}: {
  name: keyof TMultiField;
  control: TFormControl;
}) {
  const dispatch = useAppDispatch();
  const { formId, formData } = control;

  function registerFieldArray(index: number): TEditorRegisterFieldArrayReturn {
    return {
      onChange(e) {
        if (!formId) throw new Error(`Form id for field ${name} is null`);
        dispatch(
          updateArrayField({
            value: e.target.value,
            formId,
            field: name,
            index,
          })
        );
      },

      defaultValue: formData[name][index],
    };
  }

  function handleAppend() {
    if (!formId) return;
    dispatch(addArrayField({ formId, field: name }));
  }

  return { registerFieldArray, handleAppend };
}
