import { useMutation } from "@tanstack/react-query";
import APIClient from "../../api-client-new";

const apiClient = new APIClient("/user");

const useUpdatePassword = () => {
    const updatePassword = (formData, id) =>{
        apiClient.update(formData,id) 
    }
    return useMutation({
      mutationFn: updatePassword()
    });
  };

export default useUpdatePassword;
