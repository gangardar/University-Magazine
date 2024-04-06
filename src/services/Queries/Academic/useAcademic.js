import { useQuery } from "react-query";
import APIClient from "../../api-client-new";

const apiClient = new APIClient("/academic-year");

const useAcademic = () => {
  const fetchUserById = () => apiClient.getAll(); 
  return useQuery(["academic-years"], fetchUserById);
};

export default useAcademic;