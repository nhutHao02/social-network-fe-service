import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/login";
import App from "../App";
import Signup from "../pages/signup/signup";
import Home from "../pages/home/home";
import Explore from "../pages/explore/explore";
import Notification from "../pages/notification/notification";
import Message from "../pages/message/message";
import Bookmarks from "../pages/bookmark/bookmark";
import Profile from "../pages/profile/profile";
import PrivateRoute from "./privateRouter";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <PrivateRoute element={<Home />} />,
      },
      {
        path: "/home",
        element: <PrivateRoute element={<Home />} />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/explore",
        element: <PrivateRoute element={<Explore />} />,
      },
      {
        path: "/notifications",
        element: <PrivateRoute element={<Notification />} />,
      },
      {
        path: "/bookmarks",
        element: <PrivateRoute element={<Bookmarks />} />,
      },
      {
        path: "/message",
        element: <PrivateRoute element={<Message />} />,
      },
      {
        path: "/profile",
        element: <PrivateRoute element={<Profile />} />,
      },
    ],
  },
]);