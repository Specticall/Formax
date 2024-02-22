import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import FormBuilder from "../Components/Form/FormBuilder";
import Button from "../Components/General/Button";
import { OperationalFormProvider } from "../Context/OperationalFormContext";
import { useAppSelector } from "../Hooks/RTKHooks";
import { createDefaultValues } from "../helper/helper";

export default function Preview() {
  const formData = useAppSelector((state) => state.editor.formData);

  const defaultValues = formData ? createDefaultValues(formData) : {};

  const methods = useForm({
    defaultValues,
  });

  const onSubmit: SubmitHandler<typeof defaultValues> = (value) => {
    console.log(value);
  };

  return (
    <FormProvider {...methods}>
      <OperationalFormProvider defaultValues={defaultValues}>
        <main className=" min-h-screen bg-main-100 grid place-items-center p-6 py-12">
          <form
            className="max-w-[50rem] w-full"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Button
              style="secondary"
              className="justify-self-start mb-4"
              to="/"
            >
              Back
            </Button>
            <div className="bg-form ">
              <FormBuilder />
              <div className="border-t-[1px] border-border px-8 py-5 flex items-center justify-end">
                <Button>Submit</Button>
              </div>
            </div>
          </form>
        </main>
      </OperationalFormProvider>
    </FormProvider>
  );
}
