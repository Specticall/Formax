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
function FormOptionCard() {
  return (
    <div className="block text-main-400 bg-main-0 border-[1px] border-border rounded-md [&:hover_.drop-down]:grid-rows-[1fr] cursor-pointer group">
      <div className="flex items-center justify-between px-5 py-4 ">
        <div className="flex items-center gap-2">
          <i className="bx bx-chevron-right text-heading group-hover:rotate-90 transition-all"></i>
          <p className="text-body">Required</p>
        </div>
        <div className="w-[1.25rem] h-[1.25rem] border-border border-[1px] bg-main-0 rounded-sm"></div>
      </div>
      {/* /////////////// */}
      <div className="grid grid-rows-[0fr] transition-all drop-down">
        <div className="overflow-hidden">
          <div className="px-5 pb-4 ">
            <p className="text-body text-main-200">
              This option requires the user to fill the form before submitting
            </p>
          </div>
        </div>
      </div>
      {/* /////////////// */}
    </div>
  );
}
