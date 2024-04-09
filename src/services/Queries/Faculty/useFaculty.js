import { useQuery } from "react-query";
import APIClient from "../../api-client-new";

const apiClient = new APIClient("/faculty");

const useFaculty = () => {
  const fetchUserById = () => apiClient.getAll(); 
  return useQuery(["faculties"], fetchUserById);
};

export default useFaculty;