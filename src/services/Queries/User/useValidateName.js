import React from 'react'
import APIClient from '../../api-client-new'
import { useMutation } from 'react-query'

const apiClient = new APIClient("/user/checkusername")

const useValidateName = () => {
    const isValidName = async (data) => {
        console.log(data);
        return await apiClient.valid(data)
    } 
  return (
    useMutation(isValidName)
  );
}

export default useValidateName