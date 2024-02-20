import React, { useContext } from "react";
import {
  FaTaxi,
  FaCircleNodes,
  FaMotorcycle,
  FaPeopleGroup,
  FaClipboardList,
  FaPowerOff,
} from "react-icons/fa6";

import { Link, NavLink, Navigate } from "react-router-dom";

const AdminSideBar = () => {

  return (
    <div className="bg-body-tertiary sidebar pt-3 vh-100">
      <div className="m-2">
        <i className="me-3 fs-4 my-auto mx-1">
          <p>Logo</p>
          {/* <img src={logo} className="logo" alt="logo" /> */}
        </i>
        <span className="brand-name fs-4">Takasi</span>
      </div>
      <hr className="text-dark" />
      <div className="list-group list-group-flush">
        <a className="list-group-item py-2">
          <i className="fs-5 me-3">
            <FaCircleNodes />
          </i>
          <span className="fs-5">Dashboard</span>
        </a>
        <NavLink
          to={"/admin/list-driver"}
          className="list-group-item py-2 nav-link"
        >
          <i className=" fs-5 me-3">
            <FaMotorcycle />
          </i>
          <span className="fs-5">Drivers</span>
        </NavLink>
        <NavLink
          to={"/admin/list-passenger"}
          className="list-group-item py-2 nav-link"
        >
          <i className=" fs-5 me-3">
            <FaPeopleGroup />
          </i>
          <span className="fs-5">Passenger</span>
        </NavLink>
        <a className="list-group-item py-2">
          <i className=" fs-5 me-3">
            <FaClipboardList />
          </i>
          <span className="fs-5">Report</span>
        </a>
        <NavLink
          to={"/admin/admin-login"}
          className="list-group-item py-2 nav-link"
        >
          <i className=" fs-5 me-3">
            <FaPowerOff />
          </i>
          <span className="fs-5">
            Logout
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSideBar;
