import { useQuery } from "react-query";
import APIClient from "../../api-client-new";

const apiClient = new APIClient("/article/byFaculty");

const useArticleByFaculty = (id) => {
  const fetchArticleByFaculty = () => apiClient.get(id); 
  return useQuery(["user", id], fetchArticleByFaculty);
};

export default useArticleByFaculty;

