import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './components/Main.jsx';
import Header from './components/Header.jsx';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import Registration from './components/Registration.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      }
    ]
  },
],
{
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionStatusRevalidation: true,
  },
}
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} future={{
    v7_startTransition: true,
  }} />
  </StrictMode>,
)
