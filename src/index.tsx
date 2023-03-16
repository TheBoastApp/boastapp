import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from "./App";
import ErrorPage from './errorPage';
import MainNewWinForm from './components/MainNewWinComponent/MainNewWinForm';
import UserProfile from './routes/profile';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <MainNewWinForm />
      }, {
        path: 'profile',
        element: <UserProfile />
      },
    ],
  }
]);

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
