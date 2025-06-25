import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import UserLogin from "./pages/userLogin";
import UserRegister from "./pages/userRegister";
import CaptainLogin from "./pages/captainLogin";
import CaptainRegister from "./pages/captainRegister";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
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
