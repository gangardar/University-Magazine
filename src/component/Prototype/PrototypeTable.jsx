import React from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'

const PrototypeTable = () => {
  return (
    <Container fluid>
        <Row>
            <Col xs={2} md={4}>
            <Table responsive>
      <thead>
        <tr>
          <th>#</th>
          {Array.from({ length: 8 }).map((_, index) => (
            <th key={index}>Table heading</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          {Array.from({ length: 8 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>
        <tr>
          <td>2</td>
          {Array.from({ length: 8 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>
        <tr>
          <td>3</td>
          {Array.from({ length: 8 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>
      </tbody>
    </Table>
            </Col>
            <Col xs={10} md={8}  >
            <Table responsive>
      <thead>
        <tr>
          <th>#</th>
          {Array.from({ length: 8 }).map((_, index) => (
            <th key={index}>Table heading</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          {Array.from({ length: 8 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>
        <tr>
          <td>2</td>
          {Array.from({ length: 8 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>
        <tr>
          <td>3</td>
          {Array.from({ length: 8 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>
      </tbody>
    </Table>
            </Col>
            
        </Row>
        
    </Container>
    
  )
}

export default PrototypeTable