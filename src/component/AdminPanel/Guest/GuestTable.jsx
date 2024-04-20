import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import Pagination from '../ReusableComponents/Pagination';
import useFaculty from '../../../services/Queries/Faculty/useFaculty';

const GuestTable = ({
  data,
  onApprove,
  onReject,
  onSelectStateChange,
  currentSelectState,
  filterRole
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [filteredData, setFilteredData] = useState([]);

  const {data: facultyData, isSuccess: isFacultyFetchSuccess} = useFaculty();

  useEffect(() => {
    setFilteredData(data);
  }, [data, filterRole]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate index of the first and last item to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Row>
      <Col xs={12}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>@</th>
              <th>ID</th>
              <th>Email</th>
              <th>Status</th>
              <th>Faculty</th>
              <th>User ID</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {currentItems && currentItems.length > 0 ? (
              currentItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={currentSelectState.includes(item.id)}
                      onChange={() => onSelectStateChange(item.id)}
                    />
                  </td>
                  <td>{item?.id}</td>
                  <td>{item?.email}</td>
                  <td>{item?.status}</td>
                  {<td>{facultyData[item?.facultyId]?.name}</td>}
                  <td>{item?.userId}</td>
                  <td>
                    <div>
                      <Button
                      className="mx-1"
                      variant="primary"
                      onClick={() => onApprove(item.id)}
                    >
                      Approve
                    </Button>
                    <Button
                      className="mx-1"
                      variant="danger"
                      onClick={() => onReject(item.id)}
                    >
                      Reject
                    </Button>
                    </div>
                    
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={'6'}>
                  <p>No Data was found!</p>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Col>

      <Col xs={12} className="d-flex justify-content-center">
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={filteredData.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </Col>
    </Row>
  );
};

export default GuestTable;
