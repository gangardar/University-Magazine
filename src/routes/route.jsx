import React from 'react'
import LoginPage from '../Pages/LoginPage';
import NotFound from '../component/ErrorPages/NotFound';
import Layout from '../component/AdminPanel/Layout';
import DashboardPage from '../Pages/Admin/DashboardPage';
import MarketingCoPage from '../Pages/Admin/MarketingCoPage';
import MarketingMaPage from '../Pages/Admin/MarketingMaPage';
import StudentPage from '../Pages/StudentPage';
import FacultyPage from '../Pages/Admin/FacultyPage';
import PrototypeTable from '../component/Prototype/PrototypeTable';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../component/Student/pages/Home/Home';
import Submit from '../component/Student/pages/Submit/Submit';
import ArticleDetail from '../component/Student/pages/Detail/ArticleDetail';
import StudentAdminPage from '../Pages/Admin/StudentAdminPage';
import TermPage from '../Pages/Admin/TermPage';
import MarketingCoordinatorPage from '../Pages/MarketingCoordinatorPage';
import MarketingCoHome from '../component/MarketingCoordinator/pages/MarketingCoHome';
import { getRedirectPath } from '../component/getRedirectPath';

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
      { path: "/admin/marketing-manager", element: <MarketingMaPage /> },
      { path: "/admin/marketing_coordinator", element: <MarketingCoPage /> },
      { path: "/admin/student", element: <StudentAdminPage/> },
      { path: "/admin/faculty", element: <FacultyPage /> },
      { path: "/admin/term", element: <TermPage /> }
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
  {
    path: "/",
    element: <MarketingCoordinatorPage />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        path: "/marketingCoordinator",
        element: <MarketingCoordinatorPage />
      },
      { path: "/marketingCoordinator/home", element: <MarketingCoHome /> },
      { path: "/marketingCoordinator/articleDetail", element: <ArticleDetail /> },
    ]
  },

]);

const userRole = localStorage.getItem("userRole");
const redirectPath = getRedirectPath(userRole);

// If user role is available and a redirect path is determined, redirect to that path
if (userRole && redirectPath) {
  route.navigate(redirectPath)
}

export default route