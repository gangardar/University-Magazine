import { Container, Row, Col, Card } from 'react-bootstrap';
import ReportBarChart from './ReportBarChart';
import ActiveUserList from './ActiveUserList';

const Report = () => {


  const userList = [
    { name: "Admin", logins: 4 },
    { name: "Manager Hla", logins: 0 },
    { name: "Manager Aung", logins: 0 },
    { name: "Cor Htun", logins: 0 },
    { name: "Cor Aye", logins: 0 },
    { name: "Cor Mya", logins: 0 },
    { name: "HtetWaiAung", logins: 2 },
    { name: "GanGarDar", logins: 0 },
    { name: "ZarZarSoe", logins: 0 },
    { name: "ThawDarLattYar", logins: 0 },
    { name: "AkarMinKhant", logins: 0 },
    { name: "PaingPhyoAung", logins: 0 },
    { name: "MiKoKo", logins: 0 },
    { name: "MayMyatThaw", logins: 1 }
  ];

  return (
    <Container className="mt-4">
      <h2>Report</h2>
      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Most Active User</Card.Title>
              <ActiveUserList data={userList} maxItemsToShow={5} />
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
              <Card.Title>Faculty & Articles</Card.Title>
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
