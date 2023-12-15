import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Main Home</div>,
  },
  {
    path: "/posts",
    element: <div>Post List</div>,
  },
  {
    path: "/posts/:id",
    element: <div>Post Contents</div>,
  },
  {
    path: "/posts/new",
    element: <div>Post New</div>,
  },
  {
    path: "/posts/edit/:id",
    element: <div>Post Edit</div>,
  },
  {
    path: "/profile",
    element: <div>Profile</div>,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
