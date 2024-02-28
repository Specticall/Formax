import { FormLong } from "./FormLong";
import { FormMulti } from "./FormMulti";
import { FormTitle } from "./FormTitle";
import { FormShort } from "./FormShort";
import { useAppSelector } from "../../Hooks/RTKHooks";
import { TFormData } from "../../types/formTypes";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface IProps {
  isEditing?: boolean;
}

/**
 * Parses the formData array into actual form components.
 * @param formData
 * @param isEditing
 * @returns
 */

function parseFormData(formData: TFormData, isEditing: boolean = false) {
  switch (formData.type) {
    case "title":
      return (
        <FormTitle {...formData} isEditing={isEditing} key={formData.formId} />
      );
      break;
    case "short": {
      return (
        <FormShort {...formData} isEditing={isEditing} key={formData.formId} />
      );
      break;
    }
    case "long":
      return (
        <FormLong {...formData} isEditing={isEditing} key={formData.formId} />
      );
      break;
    case "multi":
      return (
        <FormMulti {...formData} isEditing={isEditing} key={formData.formId} />
      );
      break;
    default: {
      throw new Error(
        "Something went wrong while trying to parse the form data, no strings formData.type matches the avaiable components"
      );
    }
  }
}

/*
 * Component that contains the form itself. This component has two states, `edit` and `operational`. When the component is in edit state, it means that the forms are only up for display and is not hooked to a `.useForm()`. This means that we have to make sure to only use this component with `isEditing={true}` inside a `<FormProvider/>` with `.useForm()` methods passed in.
 *
 * @param isEditing - flags the component if the form is in `edit` mode (Read the desc)
 *
 * @param formData - Contains the formData that will get parsed into actual components.
 * @returns
 */
export default function FormBuilder({ isEditing = false }: IProps) {
  const formData = useAppSelector((state) => state.editor.formData);

  return (
    <article className="max-w-[70rem] mx-auto bg-form divide-y-[1px] [&>*]:px-8 [&>*]:py-8 divide-border">
      <SortableContext
        items={formData.map((data) => data.formId)}
        strategy={verticalListSortingStrategy}
      >
        {formData?.map((form) => parseFormData(form, isEditing))}
      </SortableContext>
    </article>
  );
}
