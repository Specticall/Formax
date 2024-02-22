import Button from "../General/Button";

export function Navbar() {
  return (
    <nav className="flex text-main-400 justify-between h-[4rem] px-6 items-center bg-main-100 border-b-[1px] border-border col-span-2">
      <button className="text-main-200 text-body flex gap-1 items-center [&:hover>*]:text-white">
        <i className="bx bx-chevron-left text-heading"></i>
        <p>Back</p>
      </button>
      <p className="text-body">My Form</p>
      <div className="flex gap-4">
        <Button style="secondary" to="/preview">
          Preview
        </Button>
        <Button>Publish</Button>
      </div>
    </nav>
  );
}
