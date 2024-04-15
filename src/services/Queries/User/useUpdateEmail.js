import React from 'react'
import APIClient from '../../api-client-new'
import { useMutation } from 'react-query';

const apiClient = new APIClient("/user/update");

const useUpdateEmail = () => {
    const updateEmail = async (formData) =>{
        console.log(formData);
        return await apiClient.update(formData.data, formData.id);
    }
  return useMutation(updateEmail);
}

export default useUpdateEmail