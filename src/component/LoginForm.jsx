import React from 'react';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import logo from '../assets/greenwich_green_logo.png';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { getRedirectPath } from './getRedirectPath';
import ErrorMessage from './Feedback/ErrorMessage';
import useLogin from '../services/Queries/Auth/useLogin';
import loginendpoint from '../services/loginendpoint';
import LoadingSpinner from './Feedback/LoadingSpinner';

function LoginForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  
  // Using useLogin hook
  const { mutateAsync, isLoading, isError, error, data } = useLogin();

  const handleFormSubmit = async (formData) => {
    try {
      const response = await mutateAsync(formData);
      console.log(response);
      loginendpoint.storeUserData(response);
      console.log("Login successful!");
      const path = getRedirectPath();
      console.log(path);
      navigate(path);
    } catch (error) {reset();
      console.error("Login failed:", error);
    }
  };

  return (
    <>
    {isLoading ? (<LoadingSpinner message={"Loging In. Please Wait"}/>) :
      (
      <Container style={{ backgroundColor: 'white', padding: '10px', borderRadius: '10px', maxWidth: '650px', }}>
      {isError && <ErrorMessage message={error} />}
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
                <Link to={"/guest"}>Login as Guest!</Link>
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
      )}

    </>
  );
}

export default LoginForm