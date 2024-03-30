import apiClient from "./api-client";

class ManagerEndPointService{

    getAll(){
        const controller = new AbortController();
        const request = apiClient.get("/user",{
            signal: controller.signal,
        });

        return {request, cancel : () => controller.abort()}
    }

    get(id) {
        const controller = new AbortController();
        const request = apiClient.get(`/user/${id}`, {
            signal: controller.signal,
        });
    
        return { request, cancel: () => controller.abort() };
    }

    delete(id){
        return apiClient.delete("/user/"+id)
    }

    create(user){
        return apiClient.post("/user/add", user)
    }

    update(id, data){
        return apiClient.post("/user/update/"+id, data)
    }

}

export default new ManagerEndPointService();