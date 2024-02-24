import { MouseEventHandler, useState } from "react";

export function FormOptions() {
  return (
    <article className="p-6">
      <h2 className="text-main-400 mb-5">Rules</h2>
      <div className="grid gap-2">
        <FormOptionCard />
        <FormOptionCard />
        <FormOptionCard />
        <FormOptionCard />
      </div>
    </article>
  );
}
export function FormOptionCard({
  option,
  description,
  onSelect,
  defaultValue,
}: {
  option: string;
  description: string;
  onSelect: (isSelected: boolean) => void;
  defaultValue: boolean;
}) {
  const [isSelected, setIsSelected] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenAccordion = () => {
    setIsOpen((cur) => !cur);
  };

  const handleSelect: MouseEventHandler = (e) => {
    if ((e.target as HTMLDivElement).closest(".arrow-icon")) return;
    setIsSelected((cur) => {
      onSelect(!isSelected);
      return !cur;
    });
  };
  return (
    <div
      className="block text-main-400 bg-main-0 border-[1px] border-border rounded-md cursor-pointer"
      onClick={handleSelect}
    >
      <div className="flex items-center justify-between px-5 py-4 ">
        <div className="flex items-center gap-2">
          <div className="arrow-icon w-[1.5rem] h-[1.5rem] flex items-center justify-center group [&:hover_>i]:text-main-400">
            <i
              className="bx bx-chevron-right transition-all text-main-200 text-title"
              onClick={handleOpenAccordion}
              style={{ rotate: isOpen ? "90deg" : "0deg" }}
            ></i>
          </div>
          <p className="text-body">{option}</p>
        </div>
        <div
          className=" w-[1.25rem] h-[1.25rem] border-border border-[1px] bg-main-0 rounded-sm flex items-center justify-center transition-all duration-slow"
          style={{
            backgroundColor: isSelected
              ? "rgb(255, 255, 255)"
              : "rgb(19,19,19)",
            borderColor: isSelected ? "rgb(255, 255, 255)" : "rgb(49, 49, 49)",
          }}
        >
          <i className="bx bx-check text-main-100 text-heading"></i>
        </div>
      </div>
      {/* /////////////// */}
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
