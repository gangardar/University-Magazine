import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import LoginPage from './Pages/LoginPage.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './component/AdminPanel/Layout.jsx';
import AdminSideBar from './component/AdminPanel/AdminSideBar.jsx';
import FacultyPage from './Pages/FacultyPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    
  },
  {
    path: "/admin",
    element: <AdminSideBar/>
  },
  {
    path: "/faculty",
    element: <FacultyPage/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
