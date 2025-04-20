import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  DragAndDropComponent,
  TransactionsComponent,
} from "./features/LazyLoading";
import Layout from "./components/Layout/Layout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <DragAndDropComponent />,
        },
        {
          path: "crypto",
          element: <TransactionsComponent />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
