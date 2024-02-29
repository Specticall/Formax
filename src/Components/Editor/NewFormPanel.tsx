import { CSSProperties, ReactElement } from "react";
import { TFormData } from "../../types/formTypes";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { v4 as uuidv4 } from "uuid";

export const formList: Record<TFormData["type"], TFormData> = {
  long: {
    type: "long",
    heading: "",
    placeholder: "",
    formType: "textField",
    formId: "",
    rules: {},
  },
  short: {
    type: "short",
    heading: "",
    placeholder: "",
    formType: "textField",
    formId: "",
    rules: {},
  },
  title: {
    type: "title",
    title: "",
    subtitle: "",
    formType: "textPlain",
    formId: "",
    rules: {},
  },
  multi: {
    type: "multi",
    heading: "",
    options: ["Your Options Here"],
    selected: {},
    formType: "textMulti",
    formId: "",
    rules: {},
  },
};

export function createNewFormWithId(formData: TFormData): TFormData {
  const newFormWithId = { ...formData };
  newFormWithId.formId = `${uuidv4()}-${formData.type}`;
  return newFormWithId;
}

const newFormComponents: Record<
  TFormData["type"],
  {
    type: TFormData["type"];
    displayName: string;
    icon: ReactElement;
  }
> = {
  multi: {
    type: "multi",
    displayName: "Multi",
    icon: <i className="bx bx-detail"></i>,
  },
  long: {
    type: "long",
    displayName: "Long",
    icon: <i className="bx bx-detail"></i>,
  },
  short: {
    type: "short",
    displayName: "Short",
    icon: <i className="bx bx-text"></i>,
  },
  title: {
    type: "title",
    displayName: "Title",
    icon: <i className="bx bx-heading"></i>,
  },
};

export function NewFormPanel() {
  return (
    <aside className="new-form-panel bg-main-100 border-r-[1px] border-border py-5 flex flex-col items-center">
      <h2 className="text-body text-main-400 px-6 border-b-[1px] border-border w-full text-center pb-4">
        + Add Inputs
      </h2>
      <ul className="grid gap-4 mt-8 px-6">
        {Object.values(formList).map((form) => {
          return (
            <FormItem
              formComponentDetails={newFormComponents[form.type]}
              key={`mapkey-${form.type}`}
            />
          );
        })}
      </ul>
    </aside>
  );
}

function FormItem({
  formComponentDetails,
}: {
  formComponentDetails: {
    type: TFormData["type"];
    displayName: string;
    icon: ReactElement;
  };
}) {
  const { icon, displayName, type } = formComponentDetails;

  const { setNodeRef, attributes, listeners, transform } = useDraggable({
    id: `dnd-id-${type}`,
  });

  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    zIndex: 20,
  };

  return (
    <div
      className="w-[7rem] h-[5rem] bg-main-100 flex flex-col items-center justify-center gap-2 border-[1px] border-border rounded-sm [&>i]:text-main-300 [&>i]:text-title hover:bg-form active:border-main-200 cursor-pointer"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
    >
      {icon}
      <p className="text-main-300">{displayName}</p>
    </div>
  );
}
