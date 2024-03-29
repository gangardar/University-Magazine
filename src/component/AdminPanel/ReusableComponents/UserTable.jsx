import React, { useState } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import Pagination from './Pagination';

const UserTable = ({
  data,
  onUpdate,
  onDelete,
  onSelectStateChange,
  currentSelectState,
  filterRole
}) => {
  console.log(data);
  const isAdminOrMarketingManager = filterRole === 'ADMIN' || filterRole === 'MANAGER';
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate index of the first and last item to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Filter the data based on the filterRole
  const filteredData = currentItems.filter((item) => item.role === filterRole);

  return (
    <Row>
      <Col xs={12}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>@</th>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              {!isAdminOrMarketingManager && <th>Faculty</th>}
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={currentSelectState.includes(item.id)}
                      onChange={() => onSelectStateChange(item.id)}
                    />
                  </td>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.role}</td>
                  {!isAdminOrMarketingManager && <td>{item?.faculty?.name}</td>}
                  <td>
                    <Button
                      className="mx-1"
                      variant="primary"
                      onClick={() => onUpdate(item.id)}
                    >
                      Update
                    </Button>
                    <Button
                      className="mx-1"
                      variant="danger"
                      onClick={() => onDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={isAdminOrMarketingManager ? '5' : '6'}>
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
          totalItems={data.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </Col>
    </Row>
  );
};

export default UserTable;
