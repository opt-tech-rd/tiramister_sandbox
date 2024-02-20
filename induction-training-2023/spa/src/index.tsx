import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Top from "./pages/Top";
import Counter from "./pages/Counter";
import Pokemon from "./components/Pokemon";

const router = createBrowserRouter([
  { path: "/", element: <Top /> },
  { path: "counter", element: <Counter /> },
  { path: "pokemons/:id", element: <Pokemon /> },
]);

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(<RouterProvider router={router} />);

