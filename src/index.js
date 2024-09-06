import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Join from "./Screens/Join";
import Register from "./Screens/Register";
import Login from "./Screens/Login";
import HomePage from './Screens/Home';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";



const route = createBrowserRouter([
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
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={route} />
  </React.StrictMode>
);
