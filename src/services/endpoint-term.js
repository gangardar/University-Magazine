import apiClient from "./api-client";

class EndpointTerm{

    getAll(){
        const controller = new AbortController();
        const request = apiClient.get("/academic-year",{
            signal: controller.signal,
        });

        return {request, cancel : () => controller.abort()}
    }

    delete(id){
        return apiClient.delete("/academic-year/"+id)
    }

    create(data){
        return apiClient.post("/academic-year/add", data,
        {headers: {
            'Content-Type': 'multipart/form-data'
        }})
    }

    update(id, data){
        return apiClient.post("/academic-year/update/"+id, data)}

}

export default new EndpointTerm();