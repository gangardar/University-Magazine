import React from 'react'
import APIClient from '../../api-client-new'
import { useMutation } from 'react-query'

const apiClient = new APIClient("/academic-year")

const useRemoveAcademic = () => {
    const removeAcademic = async (id) => {
        return await apiClient.suspend(id)
    }
  return (
    useMutation(removeAcademic)
  );
}

export default useRemoveAcademic