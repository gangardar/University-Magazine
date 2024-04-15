import React from 'react'
import APIClient from '../../api-client-new'
import { useMutation } from 'react-query';

const apiClient = new APIClient("/user/update");

const useUpdateUser = () => {
    const updateUser = async (formData) =>{
        return await apiClient.update(formData.faculty, formData.selectedFacultyId);
    }
  return useMutation(updateUser);
}

export default useUpdateUser