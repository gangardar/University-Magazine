import React from 'react'
import APIClient from '../../api-client-new'
import { useMutation } from 'react-query';

const apiClient = new APIClient('/academic-year');

const useAddAcademic = () => {
    const createArticle = async (formData) => {
        return await apiClient.post(formData);
    }
  return (
    useMutation(createArticle)
  );
}

export default useAddAcademic