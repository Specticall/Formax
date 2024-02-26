import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { TFormRules } from "../../types/formTypes";

type OptionProps<TReturnValue> = {
  option: string;
  description: string;
  onSelect: (value: TReturnValue) => void;
  defaultValue: number | boolean;
  enableCount?: boolean;
};

export function FormOptionCard<
  TReturnValue extends TFormRules[keyof TFormRules]
>({
  option,
  description,
  onSelect,
  defaultValue,
  enableCount,
}: OptionProps<TReturnValue>) {
  const [isSelected, setIsSelected] = useState(
    typeof defaultValue === "boolean" ? defaultValue : 0
  );
  const [count, setCount] = useState(
    typeof defaultValue === "number" ? defaultValue : 0
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenAccordion = () => {
    setIsOpen((cur) => !cur);
  };

  const handleSelect: MouseEventHandler = (e) => {
    if ((e.target as HTMLDivElement).closest(".arrow-icon")) return;
    setIsSelected((cur) => {
      return !cur;
    });
  };

  const handleChangeCount: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCount(() => Number(e.target.value) || 0);
  };

  // sends data to the the callback function.
  useEffect(() => {
    if (enableCount) {
      onSelect(count as TReturnValue);
    } else {
      onSelect(isSelected as TReturnValue);
    }
  }, [count, isSelected]);

  return (
    <div
      className="block text-main-400 bg-main-0 border-[1px] border-border rounded-md cursor-pointer"
      onClick={handleSelect}
    >
      <div className="flex items-center justify-between px-5 py-3 ">
        <div className="flex items-center gap-2">
          <div className="arrow-icon w-[1.5rem] h-[1.5rem] flex items-center justify-center group [&:hover_>i]:text-main-400">
            <i
              className="bx bx-chevron-right transition-all text-main-200 text-title"
              onClick={handleOpenAccordion}
              style={{ rotate: isOpen ? "90deg" : "0deg" }}
            ></i>
          </div>
          <p className="text-body whitespace-nowrap mr-2">{option}</p>
        </div>
        {enableCount ? (
          <input
            type="text"
            className="min-w-0 max-w-12 bg-transparent border-[1px] border-border px-2 rounded-sm outline-none overflow-x-hidden text-body"
            onChange={handleChangeCount}
            value={count}
          />
        ) : (
          <div
            className=" w-[1.25rem] h-[1.25rem] border-border border-[1px] bg-main-0 rounded-sm flex items-center justify-center transition-all duration-slow"
            style={{
              backgroundColor: isSelected
                ? "rgb(255, 255, 255)"
                : "rgb(19,19,19)",
              borderColor: isSelected
                ? "rgb(255, 255, 255)"
                : "rgb(49, 49, 49)",
            }}
          >
            <i className="bx bx-check text-main-100 text-heading"></i>
          </div>
        )}
      </div>
      {/* //////// Accordion ///// */}
      <div
        className="grid grid-rows-[0fr] transition-all drop-down"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-4 ">
            <p className="text-body text-main-200">{description}</p>
          </div>
        </div>
      </div>
      {/* /////////////// */}
    </div>
  );
}
