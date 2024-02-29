import { CSSProperties, useEffect, useState } from "react";
import IconBox from "../General/IconBox";
import { FormComponentWrapper } from "./FormComponentWrapper";
import { COLOR_ACCENT } from "../../helper/helper";
import { Controller, useFormContext } from "react-hook-form";
import { useAppSelector } from "../../Hooks/RTKHooks";

const selectedStyle: CSSProperties = {
  background: "white",
  color: "black",
};

const stateStyles = {
  error(errorMessage: string) {
    return {
      borderColor: errorMessage ? "rgb(255, 85, 146)" : "rgb(49, 49, 49)",
    };
  },
  selected(isSelected: boolean) {
    return { borderColor: isSelected ? COLOR_ACCENT : "rgb(49, 49, 49)" };
  },
};

type ISelected = Record<string, boolean>;

interface IProps {
  value?: number;
  defaultValue?: number[];
  multiple?: boolean;
  onSelect?: (selected: ISelected) => void;
  options: string[];
  heading: string;
  isEditing: boolean;
  formId: string;
  errorMessage?: string;
}

/**
 * `Form Component` - `Multiple Choice Input` :
 * Provides a multiple choice style input that user can select on.
 *
 * @param options - An array of string that contains the options of the multi choice field
 *
 * @param defaultValue - Sets the intial / default state of the component (useful when loading forms for the first time)
 *
 * @param multiple - Enabling this will allow users to select multiple options
 *
 * @param onSelect - Callback function that gets called whenever user clicks on an option with the `selected` options passed as an argument
 *
 * @param heading - Plain text that will be displayed as the heading
 *
 * @param isEditing - Form state (read the comment on `<FormBuilder/>`)
 * @returns
 */
export function FormMulti(props: IProps) {
  // DON NOT USE DESTRUCTURING, it will cause a run-time error when we're calling this component outside the FormProvider. (Which we do on edit mode.)
  const formMethods = useFormContext();

  const formData = useAppSelector((state) => state.editor.formData);
  const formRules = formData.find(
    (data) => data.formId === props.formId
  )?.rules;

  // Will ensure that the required validation method does not runs when the component first mounts AKA page load. (validate for some reason runs on mount)
  const [hasAlreadyRendered, setHasAlreadyRendered] = useState(false);
  useEffect(() => {
    setHasAlreadyRendered(true);
  }, []);

  return !props.isEditing ? (
    <Controller
      name={props.formId}
      rules={{
        // The vanilla required option does not seem to work so we have to use this workaround.
        validate: {
          value: (val) => {
            // Disable the validation function if requireed is false.
            if (!formRules?.required || !hasAlreadyRendered) return true;
            return JSON.stringify(val) !== "{}" || "Field can't be empty";
          },
        },
      }}
      control={formMethods.control}
      render={({ field: { onChange } }) => {
        return (
          <MultiInput
            onSelect={onChange}
            {...props}
            errorMessage={
              formMethods?.formState?.errors?.[props.formId]?.message as string
            }
          />
        );
      }}
    />
  ) : (
    <MultiInput {...props} />
  );
}

function MultiInput({
  options = [],
  defaultValue,
  multiple,
  onSelect = () => {},
  heading,
  isEditing,
  formId,
  errorMessage,
}: IProps) {
  /*
  [NOTE]
  `selected` is an object that contains the index as the property and the state (on/off) as its value. e.g {"1": true, "2": false, "3": true}
  */
  const [selected, setSelected] = useState<ISelected>(() => {
    /*
    [NOTE]
    `defaultValue` will be an array of numbers which indicates which index of the options will be selected.

    This function will create a new instance of an object and assign it with the corresponding default values as true to indicate that it is selected.
    */
    const defaultState: ISelected = {};

    defaultValue?.forEach((_, index) => {
      defaultState[String(index)] = true;
    });

    return defaultState;
  });

  // Closure function that will set `selected` to the index the user pressed.
  const handleSelect = (i: number) => () => {
    /*
    [NOTE]
    If the `multiple` option is enabled than the object will get reset every time a new option gets selected resulting in only one option selected.
    */
    if (!multiple) {
      setSelected({});
    }

    setSelected((current) => {
      /*
      [NOTE, !IMPORTANT]
      In react, we have to always create new references of an object in order to trigger a rerender on this component. This is why we're creating the `newSelectedState` object before assign the value.
      */
      const newSelectedState = { ...current };

      // If the value is already selected then just revert it.
      newSelectedState[i] = newSelectedState[i] ? false : true;

      return newSelectedState;
    });
  };

  // Trigger the callback function everytime "selected"s value updates
  useEffect(() => {
    onSelect(selected);
  }, [selected]);

  return (
    <FormComponentWrapper
      disableHover={!isEditing}
      formKey={formId}
      isEditing={isEditing}
    >
      <div>
        <div className="flex items-center gap-4 mb-6">
          <IconBox>
            <i className="bx bx-detail"></i>
          </IconBox>
          <div>
            <p className="text-main-300 text-body">Multiple Choice</p>
            <h2 className="text-main-400 text-heading">
              {heading || "Your Heading Here"}
            </h2>
          </div>
        </div>
        <ul className="grid gap-3">
          {options.map((option, index) => {
            /*
          [NOTE]
          The selected state sets the border of the entire element to accent and sets the checkbox style to white.
            */
            const isSelected = selected?.[index] ? true : false;
            return (
              <li
                key={`option-${index}`}
                className="w-full px-6 py-3 bg-main-100 border-[1px] border-border rounded-md text-main-400 text-body flex items-center justify-between cursor-pointer transition-all"
                onClick={handleSelect(index)}
                // Different border styles for error and for selection which each also has their own states.
                style={
                  errorMessage
                    ? stateStyles["error"](errorMessage)
                    : stateStyles["selected"](isSelected)
                }
              >
                <p className="break-all pr-4">{option}</p>
                {/* //// Checkbox //// */}
                <div
                  className="w-[1.25rem] h-[1.25rem] border-[1px] border-border rounded-[.25rem] grid place-items-center transition-all"
                  style={isSelected ? selectedStyle : undefined}
                >
                  <i className="bx bx-check text-main-100 text-heading"></i>
                </div>
              </li>
            );
          })}
        </ul>
        {errorMessage && (
          <p className="text-danger text-end mt-3">{errorMessage}</p>
        )}
      </div>
    </FormComponentWrapper>
  );
}
