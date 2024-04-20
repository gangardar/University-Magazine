import React from 'react'
import APIClient from '../../api-client-new'
import { useMutation } from 'react-query'

const apiClient = new APIClient("guest/register");

const useRegGuest = () => {
    const register = async (data) => {
        return await apiClient.login(data);
    }
  return (
    useMutation(register)
  );
}

export default useRegGuest