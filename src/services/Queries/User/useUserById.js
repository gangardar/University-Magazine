import { useQuery } from "react-query";
import APIClient from "../../api-client-new";

const apiClient = new APIClient("/user");

const useUserById = (id) => {
  const fetchUserById = () => apiClient.get(id); 
  return useQuery(["user", id], fetchUserById);
};

export default useUserById;

