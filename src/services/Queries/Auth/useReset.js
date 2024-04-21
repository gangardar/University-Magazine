import React from 'react'
import { useMutation } from 'react-query'
import APIClient from '../../api-client-new'

const apiClient = new APIClient("/user/forgetPassword");

const useReset = () => {
    const reset = async (data) => {
        return await apiClient.login(data);
    }
  return (
    useMutation(reset)
  )
}

export default useReset