import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import Home from "./pages/home";
import PostList from "./pages/posts";
import PostPage from "./components/PostPage";
import PostNew from "./pages/posts/new";
import PostEdit from "./pages/posts/edit";
import Profile from "./pages/profile";
import LogIn from "./pages/login";
import SignUp from "./pages/signup";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/posts",
    element: <PostList />,
  },
  {
    path: "/posts/:id",
    element: <PostPage />,
  },
  {
    path: "/posts/new",
    element: <PostNew />,
  },
  {
    path: "/posts/edit/:id",
    element: <PostEdit />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
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
