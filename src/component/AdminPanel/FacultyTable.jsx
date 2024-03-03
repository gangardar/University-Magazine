import React from "react";
import { Table, Button, Form, Row } from "react-bootstrap";

const FacultyTable = ({
  data,
  onUpdate,
  onDelete,
  onSelectStateChange,
  currentSelectState,
}) => {
  return (
    <Row>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>@</th>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data && data.length > 0 ? (
            data.map((item) => (
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
              <td colSpan="4">
                <p>No Data was found!</p>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Row>
  );
};

export default FacultyTable;
