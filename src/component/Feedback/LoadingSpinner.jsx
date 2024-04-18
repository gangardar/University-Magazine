import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = ({message}) => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Spinner size='lg' animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
      <p className='fs-4'>
        {message}
      </p>
      
    </div>
  );
};

export default LoadingSpinner;
