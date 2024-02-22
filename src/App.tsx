import { RouterProvider, createBrowserRouter } from "react-router-dom";
import EditorLayout from "./Pages/EditorLayout";
import Preview from "./Pages/Preview";

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
  return <RouterProvider router={router} />;
}
