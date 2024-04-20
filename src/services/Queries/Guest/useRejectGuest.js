import React from 'react'
import APIClient from '../../api-client-new'
import { useMutation } from 'react-query'

const apiClient = new APIClient("/guest/reject")

const useRejectGuest = () => {
    const reject = async (id) => {
       return await apiClient.action(id);
    }
  return (
    useMutation(reject)
  );
}

export default useRejectGuest