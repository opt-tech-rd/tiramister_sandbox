import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Top from "./pages/Top";
import Counter from "./pages/Counter";
import Detail from "./pages/Detail";

const router = createBrowserRouter([
  { path: "/", element: <Top /> },
  { path: "counter", element: <Counter /> },
  { path: "detail/:id", element: <Detail /> },
]);

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(<RouterProvider router={router} />);

