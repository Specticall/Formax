import { UseFormRegisterReturn } from "react-hook-form";
import { ChangeEventHandler } from "react";

type TProps = {
  label?: string;
  placeholder: string;
  register?: UseFormRegisterReturn<string> | object;
  errorMessage?: string;

  editorRegister?: { onChange: ChangeEventHandler<HTMLElement> };
};

/**
 * text input component that can integrate with react hook form by providing `register` and `formLabel` hook
 *
 * @param label - Plain text that displays a small text above the form (This is optional and is not used for any form related components, they are mostly used for the editor's property input fields)
 *
 * @param placeholder - Placeholder text for the input
 *
 * @param register - React hook form's `register` function, if we provide this to the component then `formLabel` is also mandatory
 *
 * @param formLabel - React hook form's `label`, used to identify the registered field name, mandatory when using `register`
 * @returns
 */
export function TextField({
  label,
  placeholder,
  register,
  editorRegister,
  errorMessage,
}: TProps) {
  const formRegister = register ? register : {};
  return (
    <div className="grid gap-2">
      {/* Only render label if provided by the user */}
      {label && <label className="text-main-400 text-body mb-1">{label}</label>}
      <div className="w-full">
        <input
          type="text"
          className="bg-main-0 rounded-md border-[1px] border-border text-body px-5 py-3 placeholder:text-main-200 text-main-400 break-all w-full"
          style={{
            borderColor: errorMessage ? "rgb(255, 85, 146)" : "rgb(49, 49, 49)",
          }}
          placeholder={placeholder}
          {...formRegister}
          {...editorRegister}
        />
        {errorMessage && (
          <p className="text-danger text-end text-body mt-3">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}
