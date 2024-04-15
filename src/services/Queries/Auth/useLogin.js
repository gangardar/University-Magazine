import { useMutation } from "react-query";
import APIClient from "../../api-client-new";

const apiClient = new APIClient("/user/login");

const useLogin = () => {
  const loginUser = async (formData) => {
    return await apiClient.login(formData);
  };

  return useMutation(loginUser);
};

export default useLogin;
