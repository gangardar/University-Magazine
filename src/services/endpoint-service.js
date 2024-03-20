import apiClient from "./api-client";

class EndpointService{

    getAll(){
        const controller = new AbortController();
        const request = apiClient.get("/faculty",{
            signal: controller.signal,
        });

        return {request, cancel : () => controller.abort()}
    }

    delete(id){
        return apiClient.delete("/faculty/"+id)
    }

    create(user){
        return apiClient.post("/faculty/add", user)
    }

    update(id, data){
        return apiClient.post("/faculty/update/"+id, data)
    }

}

export default new EndpointService();