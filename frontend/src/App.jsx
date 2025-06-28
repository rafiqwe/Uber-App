import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Start from "./pages/Start";
import UserLogin from "./pages/userLogin";
import UserRegister from "./pages/userRegister";
import CaptainLogin from "./pages/captainLogin";
import CaptainRegister from "./pages/captainRegister";
import Home from "./pages/home";
import UserProtectedWraper from "./pages/UserProtectedWraper";
import UserLogOut from "./pages/UserLogOut";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectedWraper from "./pages/CaptainProtectedWraper";
import CaptainLogout from "./pages/CaptainLogout";
import Riding from "./pages/Riding";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Start />,
    },
    {
      path: "/home",
      element: (
        <UserProtectedWraper>
          <Home />
        </UserProtectedWraper>
      ),
    },
    {
      path: "/riding",
      element: (
        <UserProtectedWraper>
          <Riding />
        </UserProtectedWraper>
      ),
    },
    {
      path: "/login",
      element: <UserLogin />,
    },
    {
      path: "/register",
      element: <UserRegister />,
    },
    {
      path: "/captain-login",
      element: <CaptainLogin />,
    },
    {
      path: "/captain-register",
      element: <CaptainRegister />,
    },
    {
      path: "/users-logout",
      element: <UserLogOut />,
    },
    {
      path: "/captain-logout",
      element: <CaptainLogout />,
    },
    {
      path: "/captain-home",
      element: (
        <CaptainProtectedWraper>
          <CaptainHome />
        </CaptainProtectedWraper>
      ),
    },
  ]);

  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
};

export default App;
