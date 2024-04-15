import { useMutation } from "react-query";
import APIClient from "../../api-client-new";

const apiClient = new APIClient("/faculty/update");

const useUpdateFaculty = () => {
    
  const updateFaculty = async (formData) => {
    return await apiClient.update(formData.faculty, formData.selectedFacultyId);
  };

  return useMutation(updateFaculty);
};

export default useUpdateFaculty;