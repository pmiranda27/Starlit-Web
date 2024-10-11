import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import Join from "./Screens/Welcome/Join";
import Register from "./Screens/Welcome/Register";
import Login from "./Screens/Welcome/Login";
import HomePage from "./Screens/Home/Home";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./Components/Services/Api_Service";
import { ChatProvider } from "./Components/Services/Chat_Service";
import { AmigosProvider } from "./Components/Services/Amigos_Service";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Join />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AmigosProvider>
        <ChatProvider>
          <RouterProvider router={route} />
        </ChatProvider>
      </AmigosProvider>
    </AuthProvider>
  </React.StrictMode>
);
