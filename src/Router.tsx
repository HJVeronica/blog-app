import Home from "pages/home";
import PostList from "pages/posts";
import PostPage from "pages/posts/detail";
import PostNew from "pages/posts/new";
import PostEdit from "pages/posts/edit";
import ProfilePage from "components/ProfilePage";
import LogIn from "pages/login";
import SignUp from "pages/signup";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import type { RouteObject } from "react-router-dom";

interface RouterProps {
  isAuthenticated: boolean;
}

const Router = ({ isAuthenticated }: RouterProps) => {
  let routerArr: RouteObject[] = [];

  if (isAuthenticated) {
    routerArr = [
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
        element: <ProfilePage />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ];
  } else {
    routerArr = [
      {
        path: "/",
        element: <Navigate to="/login" />,
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
    ];
  }

  const router = createBrowserRouter(routerArr);

  return <RouterProvider router={router} />;
};

export default Router;
