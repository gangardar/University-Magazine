import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://university-magazine-backend.onrender.com/api/v1"
});

axiosInstance.interceptors.request.use(
  (config) => {
    const apiToken = localStorage.getItem("token");

    if (apiToken) {
      const token = `Bearer ${apiToken}`;
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

class APIClient {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  getAll() {
    return axiosInstance.get(this.endpoint).then((res) => res.data);
  }

  get(id){
    return axiosInstance.get(`${this.endpoint}/${id}`).then((res) => res.data);
  }

  post(data) {
    return axiosInstance.post(this.endpoint + `/add`, data).then((res) => res.data);
  }

  update(id, data) {
    return axiosInstance.put(`${this.endpoint}/${id}`, data).then((res) => res.data);
  }

  suspend(id) {
    return axiosInstance.post(`${this.endpoint}/${id}`).then((res) => res.data);
  }
}

export default APIClient;
