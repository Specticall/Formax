import FormBuilder from "../Components/Form/FormBuilder";
import { Navbar } from "../Components/Editor/Navbar";

import { EditorPropertyPanel } from "../Components/Editor/EditorPropertyPanel";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  MouseSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useAppDispatch } from "../Hooks/RTKHooks";
import {
  addFormData,
  clearHighlightFormData,
  highlightBoard,
  highlightFormData,
  swapFormData,
} from "../slice/editorSlice";
import { NewFormPanel, formList } from "../Components/Editor/NewFormPanel";
import { useEffect, useRef, useState } from "react";

// List of class names that will prevent any dragend event from happening AKA triggers drag cancel when hovered.

/**
 * Provide structure to the main editor. This component acts as the up most parent component on the Editor route
 * @returns React Component
 */
export default function EditorLayout() {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );
  const dispatch = useAppDispatch();

  const formElRef = useRef<HTMLFormElement | null>(null);
  const boardElRef = useRef<HTMLElement | null>(null);

  // Only flags true if the user reoders elements. used to differentiate between dragging item from the newInput component or doing reordering.
  const [isReordering, setIsReodering] = useState(false);

  // Flags when use is dragging
  const [isDragging, setIsDragging] = useState(false);

  // Flags when the mouse enters an unallowed drag area WHILE dragging.
  const [onUnallowedDragArea, setOnUnallowedDragArea] = useState(false);

  // Checks if the mouse pointer is hovering over the board.
  const [pointerWithinBoard, setPointerWithinBoard] = useState(false);

  // This effect checks if the mouse position is on the board, if not then cancel any potential drag events.
  // We're not using .closest() because dnd-kit messes with the mouse event making it not expose the element we're hovering, so this is the work around we have to deal with.
  useEffect(() => {
    const watchMouse = (e: globalThis.MouseEvent) => {
      if (!isDragging) return;

      const formPos = formElRef.current?.getBoundingClientRect();
      const boardPos = boardElRef.current?.getBoundingClientRect();

      if (!formPos || !boardPos) return;
      // Check within form editor area
      const withinXAxis = formPos.left < e.clientX && e.clientX < formPos.right;

      // Check within board
      const withinBoardXAxis =
        boardPos.left < e.clientX && e.clientX < boardPos.right;
      const withinBoardYAxis =
        boardPos.top < e.clientY && e.clientY < boardPos.bottom;
      const withinBoard = withinBoardXAxis && withinBoardYAxis;

      setPointerWithinBoard(withinBoard ? true : false);
      setOnUnallowedDragArea(withinXAxis ? false : true);
      // Clear highlight if we're outside the bounding area
      if (!withinXAxis) dispatch(clearHighlightFormData());
    };

    window.addEventListener("mousemove", watchMouse);
    return () => {
      window.removeEventListener("mousemove", watchMouse);
    };
  }, [isDragging]);

  /*
  Handles dnd-kit drag event
  */
  const handleDragEnd = (event: DragEndEvent) => {
    setIsDragging(false);
    setIsReodering(false);
    // Execute the steps below if we're NOT reordering (adding new items)
    if (!isReordering) {
      // Flag end of reording (if happened in the first place)

      // Clear any highlight that might have been made (dragging new elements over)
      dispatch(clearHighlightFormData());

      const formType = (event.active.id as string).split(
        "dnd-id-"
      )[1] as keyof typeof formList;

      // Only execute if we're hovering over something.
      if (event.over && !onUnallowedDragArea)
        dispatch(
          addFormData({ formType, targetFormId: event.over.id as string })
        );

      if (!event.over && pointerWithinBoard) {
        dispatch(addFormData({ formType, targetFormId: "empty" }));
      }

      return;
    }

    const { active: current, over: target } = event;
    if (!target || !current)
      return console.log("Drag target or current is null");

    // Ensures we're draggint to the correct index.
    const currentIndex = current.data.current?.sortable.index ?? -1;
    const targetIndex = target.data.current?.sortable.index ?? -1;

    if (currentIndex === -1 || targetIndex === -1) return;

    dispatch(
      swapFormData({
        targetFormId: target.id as string,
        currentFormId: current.id as string,
      })
    );
  };

  const handleDragMove = (e: DragOverEvent) => {
    // Only executes if the user is not reordering items.
    if (isReordering || onUnallowedDragArea) return;

    // If hovering over a specific form area, then :
    if (e.over) {
      // highlights under specific form area
      dispatch(highlightFormData(e.over.id as string));
    } else {
      // highlights entire board
      dispatch(highlightBoard());
    }

    // console.log(e.over);
  };

  const handleDragStart = (e: DragStartEvent) => {
    if (e.active.data.current) setIsReodering(true);
    setIsDragging(true);
    // console.log(e.active.data.current);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragMove={handleDragMove}
      onDragStart={handleDragStart}
    >
      <main className="bg-bg min-h-screen grid grid-cols-[10rem_1fr_25rem]">
        <Navbar />
        <NewFormPanel />
        {/* ////////// MAIN FORM BUILDER COMPONENT ///////// */}
        <form
          className="editor-board p-12 h-[calc(100vh-4rem)] overflow-y-auto mx-auto w-full"
          ref={formElRef}
        >
          <FormBuilder isEditing ref={boardElRef} />
        </form>
        {/* ////////// ASIDE "FOUNDATION" ///////// */}
        {/* This element is used to take place the real aside element's place in order to maintain the grid's formattion */}
        <div className="w-full bg-red-500 h-[calc(100vh-4rem)]"></div>
        {/* ////////// ASIDE COMPONENT ///////// */}
        <EditorPropertyPanel />
      </main>
    </DndContext>
  );
}
