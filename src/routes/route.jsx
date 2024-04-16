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
import { createBrowserRouter, useNavigate } from 'react-router-dom';
import Home from '../component/Student/pages/Home/Home';
import Submit from '../component/Student/pages/Submit/Submit';
import ArticleDetail from '../component/Student/pages/Detail/ArticleDetail';
import StudentAdminPage from '../Pages/Admin/StudentAdminPage';
import TermPage from '../Pages/Admin/TermPage';
import MarketingCoordinatorPage from '../Pages/MarketingCoordinatorPage';
import MarketingCoHome from '../component/MarketingCoordinator/pages/MarketingCoHome';
import { getRedirectPath } from '../component/getRedirectPath';
import Profile from '../component/Profile/Profile';
import MarketingManagerPage from '../Pages/MarketingManagerPage';
import MarketingManager from '../component/MarketingManager/MarketingManager';
import LogoutComponent from '../component/LogoutComponent';
import Redirector from '../component/Redirector';
import GuestPage from '../Pages/GuestPage';
import GuestLogin from '../component/Guest/GuestLogin';
import ReportPage from '../Pages/Admin/ReportPage';
import logout from '../component/logout';

const handleError = (error) => {
  if (error.status === 401) {
    logout();
  }
}

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
      { path: "/admin/term", element: <TermPage /> },
      { path: "/admin/analytics", element: <ReportPage/>},
      { path: "/admin/profile", element: <Profile />},
      { path: "/admin/logout", element: <LogoutComponent/>}
    ]
  },
  {
    path: "/guest",
    element: <GuestPage/>,
    errorElement: <NotFound />,
    children : [
      {
        index : true,
        path : "/guest",
        element : <GuestLogin/>
      }
    ]
  },
  {
    path: "/prototype",
    element: <PrototypeTable />,
    errorElement: <NotFound />,
  },
  {
    path: "/student",
    element: <StudentPage/>,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        path: "/student",
        element: <Home />
      },
      {
        index: true,
        path: "/student/home",
        element: <Home />
      },
      { path: "/student/submit", element: <Submit /> },
      { path: "/student/articleDetail", element: <ArticleDetail/> },
    ]
  },
  {
    path: "/marketingCoordinator",
    element: <MarketingCoordinatorPage />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        path: "/marketingCoordinator",
        element: <MarketingCoHome />
      },
      { path: "/marketingCoordinator/home", element: <MarketingCoHome /> },
      { path: "/marketingCoordinator/articleDetail", element: <ArticleDetail /> },
    ]
  },
  {
    path: "/marketingManager",
    element: <MarketingManagerPage />,
    errorElement: <NotFound />,
    children: [
      {
        index : true,
        path: "/marketingManager/home",
        element: <MarketingManager/>
      }
    ],   
  }

],
{
  onError : handleError,
}
);

const redirectPath = getRedirectPath();
console.log("RedirectPath : " + redirectPath);
route.navigate(redirectPath);

export default route