import { PayloadAction, createSlice } from "@reduxjs/toolkit";

/*
The possible types of form data
*/
export type IFormData = { formId: string } & (
  | { type: "title"; title: string; subtitle: string; output: "string" }
  | { type: "short"; heading: string; placeholder?: string; output: "string" }
  | {
      type: "long";
      heading: string;
      placeholder?: string;
      output: "string";
    }
  | {
      type: "multi";
      heading: string;
      options: string[];
      output: "stringArray";
    }
);

// Extract field names from each type in the union
type FieldNames<T> = T extends { [key: string]: unknown } ? keyof T : never;

// Extract field names from all types in the union and combine them into a single union type
/*
Used to "alleviate" issues of not typing the IFormData indexing properly (we're using a temporary solution with any and some typecasting). With this we can atleast avoid any potential typos.
*/
export type TFormFieldNames = Exclude<
  FieldNames<IFormData>,
  "type" | "ouput" | "formId"
>;

/*
This type represent the form field data type usually passed in to react hook form's `useForm()` however since not creating the forms manually the type has be made this way.

{
  type: [contains the form component type name (abbreviations)]

  output: [contains what the expected output will be]

  formId: [an identifier that will act as the field name]

  ...requiredData : [data that the form itself needs e.g. placeholder, title, etc...]
}

[NOTE about `formId`]
formId is a identifier that is going to be used as field names inside the components itself. This is done so that we don't have to manually pass in label names. In the final result from the `submitHandler`, these formIds will then get mapped back to their original owner object.  
*/
export type TFormFields = Record<string, string | string[] | TFormFields[]>;

interface IEditor {
  selectedForm: IFormData | null;
  formData: IFormData[] | null;
}

export const formData: IFormData[] = [
  {
    type: "title",
    title: "Tell Us About Yourself",
    subtitle: "Please fill this section and tell us about your experience",
    formId: "ID_TITLE",
    output: "string",
  },
  {
    type: "long",
    heading: "Tell us your experiences!",
    placeholder: "I'm familiar with many technologies such as...",
    formId: "ID_LONG",
    output: "string",
  },
  {
    type: "short",
    heading: "What's your name",
    placeholder: "Joseph Yusmita",
    formId: "ID_SHORT",
    output: "string",
  },
  {
    type: "multi",
    heading: "Which of these traits best describe you?",
    options: ["A. Moody", "B. Expressive", "C. Calm and Collected"],
    formId: "ID_MULTI",
    output: "stringArray",
  },
];

const initialState: IEditor = {
  selectedForm: null,
  formData,
};

const editorReducer = createSlice({
  name: "editor",
  initialState,
  reducers: {
    // Handles user form select (when editing only)
    selectForm(state, action) {
      //1. Find the formData corresponding to the id
      const selectedFormData =
        state.formData?.find((data) => data.formId === action.payload) || null;

      // 2. Set the state to null if the payload has the same value as the already in else set the selectedForm state
      state.selectedForm =
        state.selectedForm?.formId === action.payload ? null : selectedFormData;
    },

    // Loads form data on successful data fetch
    loadFormData(state, action: PayloadAction<IFormData[] | null>) {
      state.formData = action.payload;
    },

    // Constantly watch and updates the form update whenever a change occurs on the corresponding field.
    watchField(
      state,
      action: PayloadAction<{
        value: string;
        formId: string;
        field: string;
      }>
    ) {
      // 1. Retrieve neccessary data from the payload
      const { value, formId, field } = action.payload;

      // 2. Find the index of the formData needed to be updated
      const targetIndex = state.formData?.findIndex(
        (data) => data.formId === formId
      );

      // 3. If the target index is not found nor the form data exist, then exit.
      if (
        // 0 is considered false (smh javascript)
        (!targetIndex && targetIndex !== 0) ||
        targetIndex == -1 ||
        !state.formData
      ) {
        console.log(`field not found ${formId}, ${field}`);
        return;
      }

      // 4. Create a shallow copy of the form Data
      // NOTE : This is required because formDataCopy is readonly.
      const formDataCopy = { ...state.formData[targetIndex] };

      // 5. Assign the value
      // Really don't have time to think about how to please the compiler with this one. Indexing a union object properly is quite difficult. Will fix sometime later in the future
      // eslint-disable-next-line
      (formDataCopy as any)[field] = value;

      // 5. Update the state itself.
      state.formData[targetIndex] = formDataCopy;
    },
  },
});

export const { selectForm, loadFormData, watchField } = editorReducer.actions;

export default editorReducer.reducer;
