import { useQuery } from "react-query";
import APIClient from "../../api-client-new";

const apiClient = new APIClient("/faculty");

const useUserById = () => {
  const fetchUserById = () => apiClient.get(); 
  return useQuery(["faculty", id], fetchUserById);
};

export default useUserById;