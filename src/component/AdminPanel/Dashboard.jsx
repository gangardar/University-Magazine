import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap';

const Dashboard = () => {
  return (
    <Container className="mt-4">
      <h2>Dashboard</h2>
      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text>15</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Total Faculties</Card.Title>
              <Card.Text>6</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className='my-2'>
        <Col>
        <Card>
            <Card.Body>
              <Card.Title>Total Articles</Card.Title>
              <Card.Text>6</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard