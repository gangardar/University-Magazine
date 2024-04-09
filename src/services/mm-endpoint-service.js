import apiClient from "./api-client";

class ManagerEndPointService {

    getAll() {
        const controller = new AbortController();
        const token = localStorage.getItem("token");
        const request = apiClient.get("/user", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            signal: controller.signal,
        });

        return { request, cancel: () => controller.abort() }
    }

    get(id) {
        const controller = new AbortController();
        const token = localStorage.getItem("token");
        const request = apiClient.get(`/user/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            signal: controller.signal,
        });

        return { request, cancel: () => controller.abort() };
    }

    delete(id) {
        const token = localStorage.getItem("token");
        return apiClient.delete("/user/" + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    create(user) {
        const token = localStorage.getItem("token");
        return apiClient.post("/user/add", user, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    update(id, data) {
        const token = localStorage.getItem("token");
        return apiClient.post("/user/update/" + id, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    changePassword(id, data) {
        const token = localStorage.getItem("token");
        return apiClient.post("/user/changepassword" + id, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

}

export default new ManagerEndPointService();
