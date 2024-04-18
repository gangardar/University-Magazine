import React from 'react'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import backgroundImg from '../../UG.jpg'
import logo from '../../assets/greenwich_green_logo.png';
import { Link } from 'react-router-dom';

const GuestLogin = () => {
    const {register, reset, handleSubmit, formState : {errors}} = useForm();
    const handleFormSubmit = (data) => {
      console.log(data)
    }


    const pageStyle = {
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      };

  return (
    <>
    <div style={pageStyle}>
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
                <h2>Sign Up</h2>
              </Col>


              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control {...register("email", {
                  required: "Email is required",
                })}
                  type="email" placeholder="Enter Email" />
                <Form.Text className="text-muted">
                  {errors.email ?
                    <span className='text-danger'>{errors.email.message}</span> :
                    <span>We'll never share your email with anyone else.</span>}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicFaculty">
                <Form.Label>Faculty</Form.Label>
                <Form.Control {...register("faculty", {
                  required: "Faculty is required",
                })}
                  type="text" placeholder="Enter Faculty" />
                <Form.Text className="text-muted">
                  {errors.faculty ?
                    <span className='text-danger'>{errors.faculty.message}</span> :
                    <span>We'll never share your details with anyone else.</span>}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Link to={"/"}>I am Already Registered...</Link>
              </Form.Group>

              <Col className="text-center">
                <Button variant="primary" type="submit">
                  Proceed
                </Button>
                  
              </Col>
            </Form>
          </Col>
        </Row>
      </Container>
      </div>
    </>
  )
}

export default GuestLogin