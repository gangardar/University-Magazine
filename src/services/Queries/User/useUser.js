import { useQuery } from "react-query";
import APIClient from "../../api-client-new";

const apiClient = new APIClient("/user");

const useUser = () => {
  const fetchUser = () => apiClient.getAll();
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUser,
  });
};

export default useUser;







