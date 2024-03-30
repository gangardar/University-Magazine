import React, { useState } from "react";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import Pagination from "./Pagination";
import { formatDate } from "../../dateUtil";

const TableComponent = ({
  data,
  onUpdate,
  onDelete,
  onSelectStateChange,
  currentSelectState,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (!data || data.length === 0) {
    return <p>No Data was Found!</p>;
  }

  const tableHeadings = Object.keys(data[0]);

  return (
    <Row>
      <Col xs={12}>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>@</th>
              {tableHeadings.map((item) => (
                <th key={item}>{item}</th>
              ))}
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
                  {tableHeadings.map((heading) => (
                    <td key={heading}>
                      {/^\d{8}$/.test(item[heading]) ? formatDate(item[heading]) : item[heading]}
                    </td>
                  ))}
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
                <td colSpan={tableHeadings.length + 2}>
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

export default TableComponent;
