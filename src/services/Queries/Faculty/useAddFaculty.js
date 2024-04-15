import { useMutation } from "react-query";
import APIClient from "../../api-client-new";

const apiClient = new APIClient("/faculty");

const useAddFaculty = () => {
  const createFaculty = async (formData) => {
    return await apiClient.post(formData);
  };

  return useMutation(createFaculty);
};

export default useAddFaculty;