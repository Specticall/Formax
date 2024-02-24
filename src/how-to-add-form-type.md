# Here's what you need to do to add a new form type

1. Create a component, starting with the name "Form"
e.g. <FormShort/>, <FormNumber/>, <FormData>, etc...

2. Inside the component, make sure to wrap the component with
<FormWrapperComponent/> and pass in

3. Inside the component, here are the props that you need to input

interface IProps {
  isEditing: boolean;
  formId: string;
  rules: TFormRules;
}

- IsEditing : differentiate editing / operational state
- formId : generated when creating a form, needed as a dependency to identify the form
- rules: an option object that's needed for the useTextForm() hook

4. if we're creating form that takes in a string, then use the `useTextForm()`, make sure to pass isEditing, name: formLabel, rules. For controlled inputs like the <FormMulti/>, only use if needed.

5. Create a property component filled with what the user needs to input. use the `useEditor()`, then pass in the required dependencies

6. If we have other input types, make sure to destructure `control` from the `useEditor()` hook and pass it as a dependency to the other hooks like `useEditorFieldArray()`

> TEMPORARY :

7. If we're using a similar format to the current one e.g. TextField, TextPlain, TextMulti make sure to add the proper typeguards! (especially on editorSlice.ts)