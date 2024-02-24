import { ChangeEventHandler, HTMLAttributes } from "react";
import { useAppDispatch, useAppSelector } from "./RTKHooks";
import { updateFormRule, updateTextField } from "../slice/editorSlice";
import {
  TFormData,
  TFormDataMerged,
  TFormMulti,
  TFormPlainText,
  TFormRules,
  TFormTextField,
} from "../types/formTypes";

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

/**This types will take an object then return a union of all the key value that has the type string in it.

const object = { a : 12, b : true, c : "hello", d: "world" }

1. Create a new object tyle 
-> { [K in keyof T]: T[K] }
  = { a : 12, b : true, c : "hello", d: "world" }
  
2. Checks if the value of the object is string, if no return `never`
-> { [K in keyof T]: T[K] extends string ? "success" : never }
  = { a : never, b : never, c : "success", d : "success" }
  
3. If succeed then we take the key value itself then assign it to the value
-> { [K in keyof T]: T[K] extends string ? K : never }
  = { a : never, b : never, c : "c", d : "d" }

4. Lastly, we then create a value union of all the types created. Never is excluded because the never type treats the type as if it does not exist.
-> { [K in keyof T]: T[K] extends string ? K : never }[keyof T]
  = "c" | "d"
 */
type ExtractStringOnlyFrom<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

function getDefaultValue(
  field: NonNullable<ExtractStringOnlyFrom<TFormDataMerged>>,
  formData: TFormData | undefined
) {
  if (!formData) return "";

  return formData[field];

  // switch (formData.formType) {
  //   case "textField":
  //     if (field !== "heading" && field !== "placeholder") break;
  //     return formData[field] || "";
  //   case "textPlain":
  //     if (field !== "title" && field !== "subtitle") break;
  //     return formData[field] || "";
  //   case "textMulti":
  //     if (field !== "heading") break;
  //     return formData[field] || "";
  //   default:
  //     throw new Error(`Can't assign a value to field : ${field}`);
  // }
}

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

  function register<
    T extends NonNullable<ExtractStringOnlyFrom<TFormDataMerged>>
  >(fieldType: T): TEditorRegisterReturn {
    return {
      /*
      Returns an onChange listener that updates the editor store everytime the user changes the input field
      */
      onChange(e) {
        if (!formId) throw new Error(`Form id for field ${fieldType} is null`);
        dispatch(
          updateTextField({ value: e.target.value, formId, field: fieldType })
        );
      },

      /*
      Retrieves the data on the object and treat it as the default value
      */
      // Only allow formData fields with the value of string to be extracted
      defaultValue: getDefaultValue(formData, fieldType),
    };
  }

  /*
  IMPORTANT : We can infer types from the passed in variable.
  */
  function registerRule<T extends keyof TFormRules>(ruleName: T) {
    return {
      onSelect(value: TFormRules[T]) {
        if (!formId) return;
        dispatch(
          updateFormRule({
            formId,
            rule: { [ruleName]: value },
          })
        );
      },

      defaultValue: formData?.rules[ruleName] || false,
    };
  }

  /**
   * Similar to react hook form's control. Allows other editor hooks to have the same data as useEditor e.g. formId
   */
  const control: TFormControl = { formId, formData };

  return { register, control, registerRule };
}
const a = {
  type: "long",
  heading: "Tell us your experiences!",
  placeholder: "I'm familiar with many technologies such as...",
  formId: "ID_LONG",
  formType: "textField",
  rules: { required: true, minLength: 10 },
};

const b = {
  type: "short",
  heading: "What's your name",
  placeholder: "Joseph Yusmita",
  formId: "ID_SHORT",
  formType: "textField",
  rules: {},
};

type combine = typeof a | typeof b;

type MergedType<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

type test = MergedType<combine>;
