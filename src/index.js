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
import HomePage from './Screens/Home';
import Messages from './Screens/Message';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Join />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/home",
    element: <HomePage />
  },
  {
    path: "/chat",
    element: <Messages />
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
