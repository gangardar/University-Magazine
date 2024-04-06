import { useQuery } from "@tanstack/react-query";
import APIClient from "../../api-client-new";

const apiClient = new APIClient("/user");

const useUser = () => {
  const fetchPassenger = () => apiClient.getAll();
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchPassenger,
  });
};

export default useUser;
