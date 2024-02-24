import { FormOptionCard, FormOptions } from "./FormOptions";
import IconBox from "../General/IconBox";
import { TextField } from "../StyledInputs/TextField";
import { ExtractType } from "../../helper/helper";
import { useAppDispatch, useAppSelector } from "../../Hooks/RTKHooks";
import { useEditor } from "../../Hooks/useEditor";
import Button from "../General/Button";
import { useEditorFieldArray } from "../../Hooks/useEditorFieldArray";
import { PropertyFormTitle } from "./PropertyFormTitle";
import { updateFormRule } from "../../slice/editorSlice";
import { TFormData } from "../../types/formTypes";

type TFormTypes = ExtractType<TFormData> | "none";

function getPropertyComponentFrom(formType: TFormTypes) {
  switch (formType) {
    case "title":
      return <PropertyFormTitle />;
      break;
    case "long":
      return <PropertyFormLong />;
      break;
    case "multi":
      return <PropertyFormMulti />;
      break;
    case "short":
      return <PropertyFormShort />;
      break;
    case "none":
      return <div>Empty</div>;
      break;
    default:
      throw new Error(`Invalid Property Component Type : ${formType}`);
  }
}

export function EditorPropertyPanel() {
  const selectedFormType =
    useAppSelector((state) => state.editor.selectedForm?.type) || "none";

  return (
    <aside className="fixed h-[calc(100vh-4rem)] w-[25rem] bg-main-100 border-l-[1px] right-0 border-border overflow-y-auto top-[4rem]">
      {getPropertyComponentFrom(selectedFormType)}
    </aside>
  );
}
function PropertyFormShort() {
  const selectedForm = useAppSelector((state) => state.editor.selectedForm);

  const { register, registerRule } = useEditor({
    formId: selectedForm?.formId,
  });
  return (
    <>
      <header className="flex text-main-400 text-body items-center gap-3 border-b-[1px] border-border px-6 py-5">
        <IconBox>
          <i className="bx bx-detail"></i>
        </IconBox>
        <h2>Short Answer</h2>
      </header>
      <div className="flex flex-col gap-4 px-6 pt-6 pb-8 border-b-[1px] border-border">
        <TextField
          label="Title"
          placeholder="Your title"
          editorRegister={register("heading")}
        />
        <TextField
          label="Placeholder"
          placeholder={"Your Placeholder"}
          editorRegister={register("placeholder")}
        />
      </div>
      <article className="p-6">
        <h2 className="text-main-400 mb-5">Rules</h2>
        <div className="grid gap-2">
          <FormOptionCard
            option="Required"
            description="This option requires the user to fill the form before submitting"
            {...registerRule("required")}
          />
        </div>
      </article>
    </>
  );
}
function PropertyFormLong() {
  const selectedForm = useAppSelector((state) => state.editor.selectedForm);

  const { register, registerRule } = useEditor({
    formId: selectedForm?.formId,
  });
  return (
    <>
      <header className="flex text-main-400 text-body items-center gap-3 border-b-[1px] border-border px-6 py-5">
        <IconBox>
          <i className="bx bx-detail"></i>
        </IconBox>
        <h2>Long Answer</h2>
      </header>
      <div className="flex flex-col gap-4 px-6 pt-6 pb-8 border-b-[1px] border-border">
        <TextField
          label="Title"
          placeholder="Your title"
          editorRegister={register("heading")}
        />
        <TextField
          label="Placeholder"
          placeholder={"Your Placeholder"}
          editorRegister={register("placeholder")}
        />
      </div>
      <article className="p-6">
        <h2 className="text-main-400 mb-5">Rules</h2>
        <div className="grid gap-2">
          <FormOptionCard
            option="Required"
            description="This option requires the user to fill the form before submitting"
            {...registerRule("required")}
          />
        </div>
      </article>
    </>
  );
}

function PropertyFormMulti() {
  const selectedForm = useAppSelector((state) => state.editor.selectedForm);

  const { register, control } = useEditor({
    formId: selectedForm?.formId,
  });
  const { registerFieldArray, handleAppend } = useEditorFieldArray({
    name: "options",
    control,
  });

  // console.log(selectedForm?.type === "multi" ? selectedForm.options : "ERR");

  return (
    <>
      <header className="flex text-main-400 text-body items-center gap-3 border-b-[1px] border-border px-6 py-5">
        <IconBox>
          <i className="bx bx-detail"></i>
        </IconBox>
        <h2>Long Answer</h2>
      </header>
      <div className="flex flex-col gap-4 px-6 pt-6 pb-8 border-b-[1px] border-border">
        <TextField
          label="Title"
          placeholder="Your title"
          editorRegister={register("heading")}
        />
        <p className="text-body text-main-400 mt-4">Options</p>
        {/* //// Option Field Arrat ///// */}
        {selectedForm?.type === "multi" &&
          selectedForm.options.map((option, index) => {
            return (
              <TextField
                key={`${option}-${index}`}
                placeholder="Your Options"
                editorRegister={registerFieldArray(index)}
              />
            );
          })}
        <Button
          className="py-3 bg-neutral-950"
          style="secondary"
          onClick={handleAppend}
        >
          + Add Option
        </Button>
      </div>
      <FormOptions />
    </>
  );
}
