import { FormOptionCard } from "./FormOptions";
import IconBox from "../General/IconBox";
import { TextField } from "../StyledInputs/TextField";
import { useAppSelector } from "../../Hooks/RTKHooks";
import { useEditor } from "../../Hooks/useEditor";

export function PropertyFormLong() {
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
        <div className="grid gap-3">
          <FormOptionCard
            option="Required"
            description="This option requires the user to fill the form before submitting"
            {...registerRule("required")}
          />
          <FormOptionCard
            option="Mininum Length"
            description="This option requires the user to fill the form the form using with a specified minimum amount of characters"
            {...registerRule("minLength")}
            enableCount
          />
        </div>
      </article>
    </>
  );
}
