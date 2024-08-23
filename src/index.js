import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Join from "./Screens/Join";
import Register from "./Screens/Register";
import Login from "./Screens/Login";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Join />
  },
  {
    path: "/registrar",
    element: <Register />
  },
  {
    path: "/logar",
    element: <Login />
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
