import React from 'react'
import APIClient from '../../api-client-new'
import { useMutation } from 'react-query'

const apiClient = new APIClient("/guest/approve")

const useApproveGuest = () => {
    const approve = async (id) => {
       return await apiClient.action(id);
    }
  return (
    useMutation(approve)
  );
}

export default useApproveGuest