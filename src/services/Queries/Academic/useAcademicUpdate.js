import React from 'react'
import APIClient from '../../api-client-new'
import { useMutation } from 'react-query'

const apiClient = new APIClient("/academic-year/update")

const useAcademicUpdate = () => {
    const updateAcademic = async (formData) => {
        console.log(formData);
        return await apiClient.update(formData.term , formData.selectedTermId);
    }
  return (
    useMutation(updateAcademic)
  );
}

export default useAcademicUpdate