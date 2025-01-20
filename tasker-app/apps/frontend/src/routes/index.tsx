import React from "react"
import { createBrowserRouter } from "react-router-dom"
import HomeScreen from "../screens/home"
import AboutScreen from "../screens/about"
import LogInScreen from "../screens/log-in"
import RegisterScreen from "../screens/register"
import Root from "./layouts/root"

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "/",
        element: <HomeScreen />,
      },
      {
        path: "/about",
        element: <AboutScreen />,
      },
      {
        path: "log-in",
        element: <LogInScreen />,
      },
      {
        path: "/register",
        element: <RegisterScreen />,
      },
    ],
  },
])

export default router
