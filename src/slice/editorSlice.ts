import { CaseReducer, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ExtractKeyValues, TFormData, TFormRules } from "../types/formTypes";

import { formData } from "../App";
import { arrayMove } from "@dnd-kit/sortable";
import {
  createNewFormWithId,
  formList,
} from "../Components/Editor/NewFormPanel";
import { arrayInsertAt } from "../helper/helper";
interface TEditor {
  selectedForm: TFormData | null;
  formData: TFormData[];
  highlighted: string;
}

function findFormIndexById(formData: TEditor["formData"], formId: string) {
  const targetIndex = formData?.findIndex((data) => data.formId === formId);

  if (targetIndex == -1) {
    console.log(`field not found ${formId}`);
    return -1;
  }
  return targetIndex;
}

const selectFormAction: CaseReducer<TEditor, PayloadAction<string>> = (
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

const loadFormDataAction: CaseReducer<TEditor, PayloadAction<TFormData[]>> = (
  state,
  action
) => {
  state.formData = action.payload;
  state.dndIdentifier = formData.map((data) => data.formId);
};

const updateTextFieldAction: CaseReducer<
  TEditor,
  PayloadAction<{
    value: string;
    formId: string;
    field: ExtractKeyValues<TFormData>;
  }>
> = (state, action) => {
  // 1. Retrieve neccessary data from the payload
  const { value, formId, field } = action.payload;

  // 2. Find the index of the formData needed to be updated
  const targetIndex = state.formData?.findIndex(
    (data) => data.formId === formId
  );

  // 3. If the target index is not found nor the form data exist, then exit.
  if (targetIndex == -1) {
    console.log(`field not found ${formId}, ${field}`);
    return;
  }

  // 4. Create a shallow copy of the form Data
  const targetField = state.formData[targetIndex];

  // 5. Assign the value (with type guards becuase ts wants it )
  switch (targetField.formType) {
    case "textField":
      if (field !== "heading" && field !== "placeholder") break;
      targetField[field] = value;
      break;
    case "textPlain":
      if (field !== "title" && field !== "subtitle") break;
      targetField[field] = value;
      break;
    case "textMulti":
      if (field !== "heading") break;
      targetField[field] = value;
      break;
    default:
      throw new Error(`Can't assign a value to field : ${field}`);
  }
};

const deleteFormDataAction: CaseReducer<
  TEditor,
  PayloadAction<{ formId: string }>
> = (state, action) => {
  // I decide to use formId instead of index just to make sure we're deleting the correct form and not cause any potential bugs especially when we start handling drag & drop

  //1. Retrieve the dependencies
  const { formId } = action.payload;

  // 2. Find the index of the formData needed to be updated
  const targetIndex = state.formData?.findIndex(
    (data) => data.formId === formId
  );

  // 3. If the target index is not found nor the form data exist, then exit.
  if (targetIndex == -1) {
    console.log(`field not found ${formId}`);
    return;
  }

  // 4. If the form we're selecting is being deleted, set the selectedForm reference to null
  if (state.selectedForm?.formId === formId) state.selectedForm = null;

  // 5. Delete the form data itself
  state.formData.splice(targetIndex, 1);
};

const updateArrayFieldAction: CaseReducer<
  TEditor,
  PayloadAction<{
    value: string;
    formId: string;
    field: keyof Extract<TFormData, { formType: "textMulti" }>;
    index: number;
  }>
> = (state, action) => {
  // 1. Retrieve neccessary data from the payload
  const { value, formId, field, index } = action.payload;

  // 2. Find the index of the formData needed to be updated
  const targetIndex = state.formData?.findIndex(
    (data) => data.formId === formId
  );

  // 3. If the target index is not found nor the form data exist, then exit.
  if (targetIndex == -1) {
    console.log(`field not found ${formId}, ${field.toString()}`);
    return;
  }

  // 6. Assign the user inputted value.
  const targetField = state.formData[targetIndex];

  // Typescript type guard
  if (targetField.formType === "textMulti") {
    /*
    INSERT THE FIELD NAME YOU WANT THE INPUT TO BE PLACED ON.
    */
    if (field !== "options")
      throw new Error(`Can't assign a value to field : ${field}`);
    targetField[field][index] = value;
  }
};

const addArrayFieldAction: CaseReducer<
  TEditor,
  PayloadAction<{
    formId: string;
    field: keyof Extract<TFormData, { formType: "textMulti" }>;
  }>
> = (state, action) => {
  // 1. Retrieve neccessary data from the payload
  const { formId, field } = action.payload;

  // 2. Find the index of the formData needed to be updated
  const targetIndex = state.formData?.findIndex(
    (data) => data.formId === formId
  );

  // 3. If the target index is not found nor the form data exist, then exit.
  if (targetIndex == -1) {
    console.log(`field not found ${formId}, ${field.toString()}`);
    return;
  }

  const targetField = state.formData[targetIndex];

  //4. Push a new value onto the target field selected array
  if (targetField.formType === "textMulti") {
    if (field !== "options")
      throw new Error(`Can't assign a value to field : ${field}`);

    if (targetField[field].some((field) => field === ""))
      return console.log("There's can't be an empty option");

    targetField[field].push("");
  }

  //5. Update selected form's reference (IMPORTANT)
  /*
      Without this, the EditorProperty component will not rerender.
      */
  state.selectedForm = state.formData[targetIndex];
};

const updateFormRuleAction: CaseReducer<
  TEditor,
  PayloadAction<{ formId: string; rule: TFormRules }>
> = (state, action) => {
  // 1. Retrieve neccessary data from the payload
  const { formId, rule } = action.payload;

  // 2. Find the index of the formData needed to be updated
  const targetIndex = state.formData?.findIndex(
    (data) => data.formId === formId
  );

  // 3. If the target index is not found nor the form data exist, then exit.
  if (targetIndex == -1) {
    console.log(`updateFormRule: field not found ${formId}`);
    return;
  }

  const ruleName = Object.keys(rule)[0] as keyof TFormRules;
  const ruleValue = rule[ruleName];

  const ruleRef = state.formData[targetIndex].rules;

  switch (ruleName) {
    case "required":
      if (typeof ruleValue !== "boolean") return;
      ruleRef["required"] = ruleValue;
      break;
    case "maxLength":
      if (typeof ruleValue !== "number") return;
      ruleRef["maxLength"] = ruleValue;
      break;
    case "minLength":
      if (typeof ruleValue !== "number") return;
      ruleRef["minLength"] = ruleValue;
      break;
    default:
      throw new Error(
        `Something went wrong while trying to assing the rule ${ruleName}`
      );
  }
};

const deleteArrayFieldAction: CaseReducer<
  TEditor,
  PayloadAction<{ formId: string; index: number }>
> = (state, action) => {
  //1. Retrieve the dependencies
  const { formId, index } = action.payload;

  // 2. Find the index of the formData needed to be updated
  const targetIndex = state.formData?.findIndex(
    (data) => data.formId === formId
  );

  // 3. If the target index is not found nor the form data exist, then exit.
  if (targetIndex == -1) {
    console.log(`field not found ${formId}`);
    return;
  }

  // 4. Make sure only array type data passes
  const targetField = state.formData[targetIndex];
  if (targetField.formType !== "textMulti")
    return console.log("Can't delete a non array type form");

  // 5. Splice the form data
  targetField.options.splice(index, 1);

  //6. Update selected form
  state.selectedForm = targetField;
};

const swapFormDataAction: CaseReducer<
  TEditor,
  PayloadAction<{
    currentFormId: string;
    targetFormId: string;
  }>
> = (state, action) => {
  // 1. Retrieve neccesary data
  const { currentFormId, targetFormId } = action.payload;

  // 2. Find both the targetIndex and the currentIndex
  const targetIndex = findFormIndexById(state.formData, targetFormId);
  const currentIndex = findFormIndexById(state.formData, currentFormId);

  if (targetIndex == -1 || currentIndex == -1) return;

  // 3. Swap both items
  state.formData = arrayMove(state.formData, currentIndex, targetIndex);
};

const initialState: TEditor = {
  selectedForm: null,
  formData: [],
  highlighted: "",
};

// TODO
type TODO = any;
// Figure out the sorting logic.
const editorReducer = createSlice({
  name: "editor",
  initialState,
  reducers: {
    // Handles user form select (when editing only)
    selectForm: selectFormAction,

    // Loads form data on successful data fetch
    loadFormData: loadFormDataAction,

    // Delete a form based on a given id
    deleteFormData: deleteFormDataAction,

    // Reorders the form data.
    swapFormData: swapFormDataAction,

    highlightFormData(state, action: PayloadAction<string>) {
      state.highlighted = action.payload;
    },

    clearHighlightFormData(state) {
      // console.log("clear");
      state.highlighted = "";
    },

    addFormData(
      state,
      action: PayloadAction<{
        targetFormId: string;
        formType: keyof typeof formList;
      }>
    ) {
      const { targetFormId, formType } = action.payload;

      const targetIndex = findFormIndexById(state.formData, targetFormId);
      if (targetIndex == -1) return;

      state.formData = arrayInsertAt(
        state.formData,
        targetIndex + 1,
        // Create a new form with generated UUID
        createNewFormWithId(formList[formType])
      );
    },

    // Constantly watch and updates the form whenever a change occurs on the corresponding TEXT field.
    updateTextField: updateTextFieldAction,

    // Similar to the function above the main difference that this one handles change an an array instead of a string.
    updateArrayField: updateArrayFieldAction,

    // Appends a new element of textMulti type elements' array
    addArrayField: addArrayFieldAction,

    // Updates the existing form rules. (enable/disable both works)
    updateFormRule: updateFormRuleAction,

    // Deletes existing option field (THE PORPERTY MUST BE NAMED OPTION)
    deleteArrayField: deleteArrayFieldAction,
  },
});

export const {
  selectForm,
  loadFormData,
  deleteFormData,
  updateTextField,
  updateArrayField,
  addArrayField,
  updateFormRule,
  deleteArrayField,
  swapFormData,
  highlightFormData,
  clearHighlightFormData,
  addFormData,
} = editorReducer.actions;

export default editorReducer.reducer;
