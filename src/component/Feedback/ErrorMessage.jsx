import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';

const ErrorMessage = ({ message }) => {
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
        <Alert variant="danger" onClose={() => setIsVisible(false)} >
          <p>{message?.response?.data||message?.message || message || "An expected Error Occured!"}</p>
        </Alert>
      )}
    </>
  );
};

export default ErrorMessage;
