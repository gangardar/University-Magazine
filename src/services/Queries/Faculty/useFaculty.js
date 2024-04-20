import { useQuery } from "react-query";
import APIClient from "../../api-client-new";

const apiClient = new APIClient("/faculty");

const useFaculty = () => {
  const fetchFaculty= () => apiClient.getAll(); 
  return useQuery(["faculties"], fetchFaculty);
};

export default useFaculty;