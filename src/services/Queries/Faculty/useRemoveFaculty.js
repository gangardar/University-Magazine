import React from 'react'
import { useMutation } from 'react-query'
import APIClient from '../../api-client-new';

const apiClient = new APIClient("/faculty");

const useRemoveFaculty = () => {
    const deleteFaculty = async (id) => {
        return await apiClient.suspend(id);
    }
    return useMutation(deleteFaculty);
}

export default useRemoveFaculty