import React from 'react'
import LoginPage from '../Pages/LoginPage';
import NotFound from '../component/ErrorPages/NotFound';
import Layout from '../component/AdminPanel/Layout';
import DashboardPage from '../Pages/DashboardPage';
import MarketingCoPage from '../Pages/MarketingCoPage';
import MarketingMaPage from '../Pages/MarketingMaPage';
import StudentPage from '../Pages/StudentPage';
import FacultyPage from '../Pages/FacultyPage';
import PrototypeTable from '../component/Prototype/PrototypeTable';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../component/Student/pages/Home/Home';
import Submit from '../component/Student/pages/Submit/Submit';
import ArticleDetail from '../component/Student/pages/Detail/ArticleDetail';

const route = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <NotFound />,

  },
  {
    path: "/admin",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        path: "/admin",
        element: <DashboardPage />
      },
      { path: "/admin/marketing-manager", element: <MarketingCoPage /> },
      { path: "/admin/marketing-coordinator", element: <MarketingMaPage /> },
      { path: "/admin/student", element: <StudentPage /> },
      { path: "/admin/faculty", element: <FacultyPage /> },
    ]
  },
  {
    path: "/prototype",
    element: <PrototypeTable />,
    errorElement: <NotFound />,
  },
  {
    path: "/",
    element: <StudentPage />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        path: "/student",
        element: <StudentPage />
      },
      { path: "/student/home", element: <Home /> },
      { path: "/student/submit", element: <Submit /> },
      { path: "/student/articleDetail", element: <ArticleDetail /> },
    ]
  },

]);

export default route