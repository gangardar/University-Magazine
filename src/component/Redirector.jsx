import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRedirectPath } from './getRedirectPath';

// Define a functional component for redirection
const Redirector = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    const redirectPath = getRedirectPath(userRole);
    
    if (userRole && redirectPath) {
      navigate(redirectPath);
    }
  }, [navigate]);

  // Return null since this component doesn't render anything
  return null;
};

export default Redirector;
