import React, { useContext, useEffect, useState } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import AdminSideBar from "./AdminSideBar";

const Layout = () => {
  
  const navigate = useNavigate();

  const [toggle, setToggle] = useState(true);
  const Toggle = () => {
    setToggle(!toggle);
  };
  return (
    <div className="container-fluid bg-dark min-vh-100 position-fixed">
      <div className="row g-0">
        {toggle && (
          <div className="col-2 bg-body-tertiary">
            <AdminSideBar />
          </div>
        )}
        <div className="col">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
