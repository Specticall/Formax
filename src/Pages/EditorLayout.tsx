import FormBuilder from "../Components/Form/FormBuilder";
import { Navbar } from "../Components/Editor/Navbar";

import { EditorPropertyPanel } from "../Components/Editor/EditorPropertyPanel";

/**
 * Provide structure to the main editor. This component acts as the up most parent component on the Editor route
 * @returns React Component
 */
export default function EditorLayout() {
  return (
    <main className="bg-bg min-h-screen grid grid-cols-[1fr_25rem]">
      <Navbar />
      {/* ////////// MAIN FORM BUILDER COMPONENT ///////// */}
      <form className="p-12 h-[calc(100vh-4rem)] overflow-y-auto mx-auto w-full">
        <FormBuilder isEditing />
      </form>

      {/* ////////// ASIDE "FOUNDATION" ///////// */}
      {/* This element is used to take place the real aside element's place in order to maintain the grid's formattion */}
      <div className="w-full bg-red-500 h-[calc(100vh-4rem)]">test</div>

      {/* ////////// ASIDE COMPONENT ///////// */}
      <EditorPropertyPanel />
    </main>
  );
}
