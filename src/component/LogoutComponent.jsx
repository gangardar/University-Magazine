import React, { useEffect } from 'react';
import useLogout from "../services/Queries/Auth/useLogout";
import loginendpoint from '../services/loginendpoint';
import {useNavigate} from 'react-router-dom';
import ErrorMessage from './Feedback/ErrorMessage';
import LoadingSpinner from './Feedback/LoadingSpinner';

const LogoutComponent = () => {
  const { isLoading, isError, data, error, refetch } = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate('/');
    }
    const handleLogout = async () => {
      try {
        await refetch();
        loginendpoint.clearUserData();
        console.log("User logged out successfully.");
        navigate('/');
      } catch (error) {
        if (error.response && error.response.status === 401) {
          loginendpoint.clearUserData();
          console.log("User logged out successfully despite error 401.");
          navigate('/');
        } else {
          console.error("Error logging out:", error);
        }
      }
    };

    handleLogout();
  }, []);

  return (
    <div>
      {isLoading ? (
        <LoadingSpinner message={"Logging Out"} />
      ) : (
        <>
          {isError && <ErrorMessage message={error} />}
          {data && <div>{data}</div>}
        </>
      )}
    </div>
  );
};

export default LogoutComponent;
