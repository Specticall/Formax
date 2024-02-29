import { CSSProperties, ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../Hooks/RTKHooks";
import { deleteFormData, selectForm } from "../../slice/editorSlice";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface IProps {
  children: ReactNode;
  disableHover?: boolean;
  formKey: string;
  isEditing?: boolean;
}

/**
 * This component is used to wrap around form components and provide them with delete icon, move icon & hover effect.
 * @param children
 * @param disableHover - Disable the hover effect (turn on to allow user to interact with the form wrapped by this component)
 * @param formKey - Works in a similar manner to react's key. This prop will be a unique identifier used to identify which form is this. One usage is to send a dispatch to set the editor store's selectedForm state to the corresponding form
 * @returns React Component
 */
export function FormComponentWrapper({
  formKey,
  children,
  disableHover = false,
  isEditing = false,
}: IProps) {
  if (!formKey) throw new Error("Form key not provided!");

  const selected = useAppSelector((state) => state.editor.selectedForm?.formId);

  const isHighlighted =
    useAppSelector((state) => state.editor.highlighted) === formKey;
  const dispatch = useAppDispatch();

  // dnd-kit used to hook the component to the dnd-kit context.
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: formKey,
    });

  // This is always false if hover is disabled.
  const isSelected = formKey === selected && !disableHover;

  // Style for dnd kit sorting and selected background
  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    background: isSelected ? "#1C1B23" : "rgb(23,24,28)",
    borderBottom: isHighlighted ? "5px solid white" : "",
  };

  const handleSelect = () => {
    dispatch(selectForm(formKey));
  };

  const handleDelete = () => {
    dispatch(deleteFormData({ formId: formKey }));
  };

  return (
    <div
      className="relative [&:hover_.warning]:opacity-100"
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      {/* //// HOVER ELEMENT //// */}
      {disableHover || (
        <div
          className="warning absolute inset-0 opacity-0 text-main-300 outline-2 outline-white/20 outline-offset-[-2px] cursor-pointer flex items-center justify-center gap-2 duration-fast transition-all"
          style={{
            background:
              "linear-gradient(90deg, rgba(2,0,36,0) 0%, rgba(23,24,28,1) 23%, rgba(23,24,28,1) 78%, rgba(0,0,0,0) 100%)",
          }}
          onClick={handleSelect}
        >
          <i className="bx bxs-info-circle text-heading"></i>
          <p>Drag to move or click to open properties</p>
        </div>
      )}
      {/* //// ICON ELEMENT //// */}
      <div className="flex gap-2 z-10 absolute right-8 top-6">
        {isEditing && (
          <>
            <i
              className="bx bx-trash text-heading text-main-200 hover:text-danger cursor-pointer"
              onClick={handleDelete}
            ></i>
            <i className="bx bx-grid-vertical text-heading text-main-200"></i>
          </>
        )}
      </div>
      {children}
    </div>
  );
}
