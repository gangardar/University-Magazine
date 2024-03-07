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

const route = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
      errorElement: <NotFound/>,
      
    },
    {
      path: "/admin",
      element: <Layout/>,
      errorElement: <NotFound/>,
      children: [
        {
          index: true,
          path: "/admin",
          element: <DashboardPage/>
        },
        { path: "/admin/marketing-manager", element: <MarketingCoPage/> },
        { path: "/admin/marketing-coordinator", element: <MarketingMaPage /> },
        { path: "/admin/student", element: <StudentPage/> },
        {path : "/admin/faculty", element: <FacultyPage/>}
      ]
    },
    {
      path:"/prototype",
      element: <PrototypeTable/>,
      errorElement: <NotFound/>,
    }
    
  ]);

export default route