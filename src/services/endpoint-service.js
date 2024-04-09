import apiClient from "./api-client";

class EndpointService {
    getAll() {
        const controller = new AbortController();
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("Token not available");
        }
        const request = apiClient.get("/faculty", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            signal: controller.signal,
        });

        return { request, cancel: () => controller.abort() }
    }

    delete(id) {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("Token not available");
        }
        return apiClient.delete("/faculty/" + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    create(user) {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("Token not available");
        }
        return apiClient.post("/faculty/add", user, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    update(id, data) {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("Token not available");
        }
        return apiClient.post("/faculty/update/" + id, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}

export default new EndpointService();
