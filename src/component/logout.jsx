import { useEffect } from 'react';
import useLogout from "../services/Queries/Auth/useLogout";
import loginendpoint from '../services/loginendpoint';
import { useNavigate } from 'react-router-dom';

const logout = () => {
  const { refetch } = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [refetch, navigate]);

  return null;
};

export default logout;
