import React from 'react'
import APIClient from '../../api-client-new'
import { useMutation } from 'react-query'


const apiClient = new APIClient("/user")

const useUserCreate = () => {
    const addUser = async (formData) => {
        return await apiClient.post(formData);
    }
  return ( useMutation(addUser));
}

export default useUserCreate