import React, { useContext, useEffect, useState } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import AdminSideBar from "./AdminSideBar";
import { Col, Container, Row } from "react-bootstrap";
import { getRedirectPath } from "../getRedirectPath";

const Layout = () => {
  
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('userRole') !== 'ADMIN'){
    const redirectPath = getRedirectPath();
    console.log("RedirectPath : " + redirectPath);
    navigate(redirectPath);
  }
  },[navigate])

  
  

  const [toggle, setToggle] = useState(true);
  const Toggle = () => {
    setToggle(!toggle);
  };
  return (
    <>
    <Container fluid>
    <Row>
      <Col xs='auto' className="ps-0" style={{}} >
        <AdminSideBar />
      </Col>
      <Col xs={9} md={9} lg={9}>
        <Outlet />
      </Col>
    </Row>
    </Container>  
    </>
  );
};

export default Layout;
