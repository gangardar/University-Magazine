import { useQuery } from "react-query";
import APIClient from "../../api-client-new";

const apiClient = new APIClient("/logout");

const useLogout = () => {
  const fetchLogout = async () => {
     return await apiClient.getAll();    
  };

  return useQuery("logout", fetchLogout);
};

export default useLogout;
