import Chart from 'chart.js/auto';
import React, { useRef, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import ReportBarChart from './ReportBarChart';

const Report = () => {

  return (
    <Container className="mt-4">
      <h2>Report</h2>
      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>User Report</Card.Title>
              <ul>
                <li>Admin: 4 logins</li>
                <li>Manager Hla: 0 logins</li>
                <li>Manager Aung: 0 logins</li>
                <li>Cor Htun: 0 logins</li>
                <li>Cor Aye: 0 logins</li>
                <li>Cor Mya: 0 logins</li>
                <li>HtetWaiAung: 0 logins</li>
                <li>GanGarDar: 0 logins</li>
                <li>ZarZarSoe: 0 logins</li>
                <li>ThawDarLattYar: 0 logins</li>
                <li>AkarMinKhant: 0 logins</li>
                <li>PaingPhyoAung: 0 logins</li>
                <li>MiKoKo: 0 logins</li>
                <li>MayMyatThaw: 0 logins</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Faculty Report</Card.Title>
              <ul>
                <li>Computer Science: 4 users, 2 articles</li>
                <li>Physics: 4 users, 2 articles</li>
                <li>Engineering: 3 users, 2 articles</li>
                <li>Biology: 0 users, 0 articles</li>
                <li>Art: 0 users, 0 articles</li>
                <li>Mathematics: 0 users, 0 articles</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Faculty Report</Card.Title>
              {/* Bar chart */}
              <ReportBarChart />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Report;
