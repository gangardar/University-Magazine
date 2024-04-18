import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';

const SuccessMessage = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isVisible && (
        <Alert variant="success" onClose={() => setIsVisible(false)}>
          <p>{message}</p>
        </Alert>
      )}
    </>
  );
};

export default SuccessMessage;