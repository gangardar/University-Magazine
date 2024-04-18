import React from 'react'
import APIClient from "../../api-client-new";
import { useQuery } from 'react-query';

const useReportFaculty = () => {
    const apiClient = new APIClient("/report/faculty")
    const getFaculty = async () => {
        return await apiClient.getAll();
    }
    return useQuery(["report-faculty"], getFaculty);
}

export default useReportFaculty