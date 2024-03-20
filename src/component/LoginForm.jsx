import React from 'react'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import logo from '../Logo.png';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

// bizdept@kmdcomputer.com
function LoginForm() {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleFormSubmit = (data) => console.log(data);

  return (
    <>
      <Container style={{ backgroundColor: 'white', padding: '10px', borderRadius: '10px', maxWidth: '650px', }}>
        <Row className="mb-2 justify-content-center">
          <Col xs={12} md={10}>
            <img src="" alt="" />
            <Image src="https://university-magazine-backend.onrender.com/api/v1/user/profilePhoto/download/1" />
          </Col>
        </Row>

        <Row className='justify-content-center'>
          <Col xs={12} md={10}>
            <Form onSubmit={handleSubmit(handleFormSubmit)} >
              <Col className="text-center">
                <h2>Login</h2>
              </Col>


              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control {...register("email", {
                  required: "email field is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                  },
                })}
                  type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  {errors.email ?
                    <span className='text-danger'>{errors.email.message}</span> :
                    <span>We'll never share your email with anyone else.</span>}
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
                {/* <Button variant="primary" type="submit">
                  Login
                </Button> */}
                <Link to="/student/home">
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </Link>
              </Col>
            </Form>
          </Col>
        </Row>
      </Container>

    </>
  );
}

export default LoginForm