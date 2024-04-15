import React from 'react'
import { useMutation } from 'react-query'
import APIClient from '../../api-client-new';

const apiClient = new APIClient("/user");

const useRemoveUser = () => {
    const deleteUser = async (id) => {
        return await apiClient.suspend(id);
    }
    return useMutation(deleteUser);
}

export default useRemoveUser;