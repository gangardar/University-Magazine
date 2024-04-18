import { useMutation } from "react-query";
import APIClient from "../../api-client-new";

const apiClient = new APIClient("/user/changePassword");

const useUpdatePassword = (id) => {
    const updatePassword = async (formData) =>{
        return await apiClient.update(formData.data, formData.id) 
    }
    return useMutation({mutationFn: updatePassword});
  };

export default useUpdatePassword;
