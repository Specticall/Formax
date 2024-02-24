import IconBox from "../General/IconBox";
import { TextField } from "../StyledInputs/TextField";
import { useAppSelector } from "../../Hooks/RTKHooks";
import { useEditor } from "../../Hooks/useEditor";

export function PropertyFormTitle() {
  const selectedForm = useAppSelector((state) => state.editor.selectedForm);

  const { register } = useEditor({ formId: selectedForm?.formId });

  return (
    <>
      <header className="flex text-main-400 text-body items-center gap-3 border-b-[1px] border-border px-6 py-5">
        <IconBox>
          <i className="bx bx-detail"></i>
        </IconBox>
        <h2>Title</h2>
      </header>
      <div className="flex flex-col gap-4 px-6 pt-6 pb-8 border-b-[1px] border-border">
        <TextField
          label="Title"
          placeholder="Your title"
          editorRegister={register("title")}
        />
        <TextField
          label="Subtitle"
          placeholder={"Your Subtitle"}
          editorRegister={register("subtitle")}
        />
      </div>
    </>
  );
}
