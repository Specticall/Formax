import { RouterProvider, createBrowserRouter } from "react-router-dom";
import EditorLayout from "./Pages/EditorLayout";
import Preview from "./Pages/Preview";
import { useEffect } from "react";
import { useAppDispatch } from "./Hooks/RTKHooks";
import { loadFormData } from "./slice/editorSlice";
import { TFormData } from "./types/formTypes";

export const formData: TFormData[] = [
  {
    type: "title",
    title: "Tell Us About Yourself",
    subtitle: "Please fill this section and tell us about your experience",
    formId: "ID_TITLE",
    formType: "textPlain",
    rules: {},
  },
  // {
  //   type: "multi",
  //   heading: "Which of these traits best describe you?",
  //   options: ["A. Moody", "B. Expressive", "C. Calm and Collected"],
  //   formId: "ID_MULTI",
  //   selected: { 1: true, 3: true },
  //   formType: "textMulti",
  //   rules: {},
  // },
  // {
  //   type: "long",
  //   heading: "Tell us your experiences!",
  //   placeholder: "I'm familiar with many technologies such as...",
  //   formId: "ID_LONG",
  //   formType: "textField",
  //   rules: {},
  // },
  // {
  //   type: "short",
  //   heading: "What's your name",
  //   placeholder: "Joseph Yusmita",
  //   formId: "ID_SHORT",
  //   formType: "textField",
  //   rules: {},
  // },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <EditorLayout />,
  },
  {
    path: "/preview",
    element: <Preview />,
  },
]);

export default function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadFormData(formData));
  }, [dispatch]);

  return <RouterProvider router={router} />;
}
