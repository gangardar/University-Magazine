import React from 'react'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import logo from '../assets/greenwich_green_logo.png';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { getRedirectPath } from './getRedirectPath';
import loginendpoint from '../services/loginendpoint';

function LoginForm() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const handleFormSubmit = async(data) => {
    try {
      const response = await loginendpoint.login(data);
      loginendpoint.storeUserData(response.data);
      console.log("Login successful!");
      const path = getRedirectPath();
      console.log(path);
      navigate(path);
  } catch (error) {
      console.error("Login failed:", error);
  }
  };

  return (
    <>
      <Container style={{ backgroundColor: 'white', padding: '10px', borderRadius: '10px', maxWidth: '650px', }}>
      <Row className="mb-2 justify-content-center">
          <Col xs={12} md={10}>
            <div className="d-flex justify-content-start">
              <Image src={logo} fluid style={{width: '200px'}}/>
            </div>
          </Col>
        </Row>

        <Row className='justify-content-center'>
          <Col xs={12} md={10}>
            <Form onSubmit={handleSubmit(handleFormSubmit)} >
              <Col className="text-center">
                <h2>Login</h2>
              </Col>


              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control {...register("username", {
                  required: "Username is required",
                })}
                  type="username" placeholder="Enter username" />
                <Form.Text className="text-muted">
                  {errors.username ?
                    <span className='text-danger'>{errors.username.message}</span> :
                    <span>We'll never share your username with anyone else.</span>}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control {...register("password", {
                  required: "password is required",
                  minLength: {
                    value: 6,
                    message: "min length is 6",
                  },
                })} type="password" placeholder="Password" />
                {errors.password &&
                  <Form.Text className='text-danger'>
                    {errors.password.message}
                  </Form.Text>
                }
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Text as={'a'}>Login as Guest!</Form.Text>
                {/* <Link to={"/driver-register"}>Login as Guest!</Link> */}
              </Form.Group>

              <Col className="text-center">
                <Button variant="primary" type="submit">
                  Login
                </Button>
                  
              </Col>
            </Form>
          </Col>
        </Row>
      </Container>

    </>
  );
}

export default LoginForm