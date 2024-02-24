import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  IFormData,
  IEditor,
  TTextField,
  TTextPlain,
  TMultiField,
} from "../types/formTypes";

export const formData: IFormData[] = [
  {
    type: "title",
    title: "Tell Us About Yourself",
    subtitle: "Please fill this section and tell us about your experience",
    formId: "ID_TITLE",
    output: "string",
    formType: "textPlain",
    rules: [],
  },
  {
    type: "long",
    heading: "Tell us your experiences!",
    placeholder: "I'm familiar with many technologies such as...",
    formId: "ID_LONG",
    output: "string",
    formType: "textField",
    rules: [],
  },
  {
    type: "short",
    heading: "What's your name",
    placeholder: "Joseph Yusmita",
    formId: "ID_SHORT",
    output: "string",
    formType: "textField",
    rules: [{ required: true }],
  },
  {
    type: "multi",
    heading: "Which of these traits best describe you?",
    options: ["A. Moody", "B. Expressive", "C. Calm and Collected"],
    formId: "ID_MULTI",
    selected: { 1: true, 3: true },
    output: "stringArray",
    formType: "textMulti",
    rules: [],
  },
];

const selectFormAction: CaseReducer<IEditor, PayloadAction<string>> = (
  state,
  action
) => {
  //1. Find the formData corresponding to the id
  const selectedFormData =
    state.formData?.find((data) => data.formId === action.payload) || null;

  // 2. Set the state to null if the payload has the same value as the already in else set the selectedForm state
  state.selectedForm =
    state.selectedForm?.formId === action.payload ? null : selectedFormData;
};

const loadFormDataAction: CaseReducer<
  IEditor,
  PayloadAction<IFormData[] | null>
> = (state, action) => {
  state.formData = action.payload;
};

const updateTextFieldAction: CaseReducer<
  IEditor,
  PayloadAction<{
    value: string;
    formId: string;
    field: keyof TTextField | keyof TTextPlain;
  }>
> = (state, action) => {
  // 1. Retrieve neccessary data from the payload
  const { value, formId, field } = action.payload;

  // 2. Find the index of the formData needed to be updated
  const targetIndex = formData?.findIndex((data) => data.formId === formId);

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

  // // 4. Create a shallow copy of the form Data
  // // NOTE : This is required because formDataCopy is readonly.
  const formDataCopy = { ...state.formData[targetIndex] };

  // 5. Assign the value
  (
    formDataCopy as {
      [key in keyof TTextField]: unknown;
    } & {
      [key in keyof TTextPlain]: unknown;
    }
  )[field] = value;

  // 5. Update the state itself.
  state.formData[targetIndex] = formDataCopy;
};

const updateArrayFieldAction: CaseReducer<
  IEditor,
  PayloadAction<{
    value: string;
    formId: string;
    field: keyof TMultiField;
    index: number;
  }>
> = (state, action) => {
  // 1. Retrieve neccessary data from the payload
  const { value, formId, field, index } = action.payload;

  // 2. Find the index of the formData needed to be updated
  const targetIndex = formData?.findIndex((data) => data.formId === formId);

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

  // // 4. Create a shallow copy of the form Data
  // // NOTE : This is required because formDataCopy is readonly.
  const formDataCopy = { ...state.formData[targetIndex] };

  // 6. Assign the user inputted value.
  /*
  NOTE: We don't need to assign state.formData[targetIndex] = formDataCopy because formDataCopy is a shallow copy, as such formDataCopy[field] still points to the same address as state.formData[targetIndex][field]
  */
  const targetField = (formDataCopy as { [key in keyof TMultiField]: unknown })[
    field
  ];

  if (Array.isArray(targetField)) {
    targetField[index] = value;
  }
};

const addArrayFieldAction: CaseReducer<
  IEditor,
  PayloadAction<{ formId: string; field: keyof TMultiField }>
> = (state, action) => {
  // 1. Retrieve neccessary data from the payload
  const { field, formId } = action.payload;

  // 2. Find the index of the formData needed to be updated
  const targetIndex = formData?.findIndex((data) => data.formId === formId);

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

  const targetField = (
    formDataCopy as {
      [key in typeof field]: unknown;
    }
  )[field];

  if (!Array.isArray(targetField)) return;

  // If the any  element is currently empty then throw an error
  if (targetField.some((field) => field === ""))
    return console.log("FILL THE CURRENT ONE FIRST");

  targetField.push("");

  state.selectedForm = formDataCopy;
};

const initialState: IEditor = {
  selectedForm: null,
  formData,
};

const editorReducer = createSlice({
  name: "editor",
  initialState,
  reducers: {
    // Handles user form select (when editing only)
    selectForm: selectFormAction,

    // Loads form data on successful data fetch
    loadFormData: loadFormDataAction,

    // Constantly watch and updates the form whenever a change occurs on the corresponding TEXT field.
    updateTextField: updateTextFieldAction,

    // Similar to the function above the main difference that this one handles change an an array instead of a string.
    updateArrayField: updateArrayFieldAction,

    // append a new element to the most recent array element.
    addArrayField: addArrayFieldAction,
  },
});

export const {
  selectForm,
  loadFormData,
  updateTextField,
  updateArrayField,
  addArrayField,
} = editorReducer.actions;

export default editorReducer.reducer;
