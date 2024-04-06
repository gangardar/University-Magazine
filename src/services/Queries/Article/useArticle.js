import { useQuery } from "react-query";
import APIClient from "../../api-client-new";

const apiClient = new APIClient("/article");

const useArticle = () => {
  const fetchUserById = () => apiClient.getAll(); 
  return useQuery(["articles"], fetchUserById);
};

export default useArticle;