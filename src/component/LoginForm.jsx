import React from 'react'
import { Button, Col, Container, Form, Image, Row} from 'react-bootstrap';
import logo from '../Logo.png';

function LoginForm() {
  return (
    <>
    <Container style={{ backgroundColor: 'white', padding: '10px', borderRadius: '10px', maxWidth: '650px',}}>
      <Row className="mb-2 justify-content-center">
        <Col xs={12} md={10}>
          <Image src={logo} />
        </Col>        
      </Row>

      <Row className='justify-content-center'>
        <Col xs={12} md={10}>
          <Form>
          <Col className="text-center">
          <h2>Login</h2>
          </Col>


            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
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