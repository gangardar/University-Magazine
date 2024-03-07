import React from "react";
import { Table, Button, Form, Row } from "react-bootstrap";

const TableComponent = ({
  data,
  onUpdate,
  onDelete,
  onSelectStateChange,
  currentSelectState,
}) => {
    if(!data | data.length === 0){
        return (
            <p>No Data was Found!</p>
        );
    }
    const tableHeadings = Object.keys(data[0]);

  return (
    <Row>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>@</th>
            {tableHeadings.map((item)=>(
                <th key={item}>{item}</th>
            ))}
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

export default TableComponent;
