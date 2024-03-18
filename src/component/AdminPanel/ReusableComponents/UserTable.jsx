import React from 'react';
import { Button, Form, Row, Table } from 'react-bootstrap';

const UserTable = ({
  data,
  onUpdate,
  onDelete,
  onSelectStateChange,
  currentSelectState,
  filterRole
}) => {
  const isAdminOrMarketingManager = filterRole === 'Admin' || filterRole === 'Marketing Manager';

  // Filter the data based on the filterRole
  const filteredData = data?.filter((item) => item.role === filterRole);

  return (
    <Row>
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
    </Row>
  );
};

export default UserTable;
