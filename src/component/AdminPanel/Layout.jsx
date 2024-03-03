import React, { useContext, useEffect, useState } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import AdminSideBar from "./AdminSideBar";
import { Col, Container, Row } from "react-bootstrap";

const Layout = () => {
  
  const navigate = useNavigate();

  const [toggle, setToggle] = useState(true);
  const Toggle = () => {
    setToggle(!toggle);
  };
  return (
    <>
    <Container fluid>
    <Row>
      <Col className="ps-0" xs='auto'>
        {/* Content for AdminSideBar */}
        <AdminSideBar />
      </Col>
      <Col >
        {/* Content for Outlet */}
        <Outlet />
      </Col>
    </Row>
    </Container>  
    </>
  );
};

export default Layout;
