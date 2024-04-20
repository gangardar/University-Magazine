import React from 'react';
import { Navbar, Container, Nav, FormControl, Form, Button, Image } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';// Import the UserInfoCard component
import UserInfoCard from '../Student/Components/Navbar/UserInfoCard';
import logo from '../../assets/greenwich_green_logo.png';

const NavBar = ({user}) => {
  const userRole = localStorage.getItem('userRole')? localStorage.getItem('userRole') : '' ;
  
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home"><Image src={logo} fluid style={{width: '200px'}}/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav className="mx-auto">
            <Nav.Link href="/marketingManager/home">Home</Nav.Link>
            {userRole !== "GUEST" && <Nav.Link href="/marketingManager/article">Article</Nav.Link>}
            <Nav.Link href="/marketingManager/profile">Profile</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl type="search" placeholder="Search" className="mr-2" aria-label="Search" />
            <Button variant="outline-primary"><FaSearch /></Button>
          </Form>
          <UserInfoCard user={user} /> 
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
