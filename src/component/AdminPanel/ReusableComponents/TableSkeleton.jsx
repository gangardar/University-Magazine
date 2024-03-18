import React from 'react';
import { Table } from 'react-bootstrap';
import { FaSpinner } from 'react-icons/fa'; // Import loading icon from react-icons library

const TableSkeleton = ({ columnCount }) => {
  // Define the number of skeleton rows to render
  const skeletonRowCount = 5;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>@</th>
          {[...Array(columnCount)].map((_, index) => (
            <th key={index}>Loading...</th>
          ))}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {[...Array(skeletonRowCount)].map((_, index) => (
          <tr key={index}>
            <td>Loading...</td>
            {[...Array(columnCount)].map((_, colIndex) => (
              <td key={colIndex}><FaSpinner className="spinner" /></td>
            ))}
            <td>
              <button className="btn btn-primary" disabled>Loading...</button>
              <button className="btn btn-danger" disabled>Loading...</button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableSkeleton;
