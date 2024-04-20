import React from 'react'
import APIClient from '../../api-client-new'
import { useQuery } from 'react-query'

const apiClient = new APIClient("/guest/all")

const useGuest = () => {
    const getGuest = async () => {
        return await apiClient.getAll();
    }
  return (
    useQuery(["guests"], getGuest)
  );
}

export default useGuest