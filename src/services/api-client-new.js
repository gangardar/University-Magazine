import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://university-magazine-backend.onrender.com/api/v1",
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const apiToken = localStorage.getItem("token");

    if (apiToken) {
      const token = `Bearer ${apiToken}`;
      config.headers["Authorization"] = token;
    }

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
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

  update(data, id) {
    return axiosInstance.post(`${this.endpoint}/${id}`, data).then((res) => res.data);
  }

  suspend(id) {
    return axiosInstance.delete(`${this.endpoint}/${id}`).then((res) => res.data);
  }

  login(data){
    return axiosInstance.post(this.endpoint, data).then((res) => res.data);
  }

  action(id){
    return axiosInstance.post(`${this.endpoint}/${id}`).then((res)=> res.data);
  }

  valid(data){
    return axiosInstance.get(`${this.endpoint}?username=${data}`).then((res) => res.data);
  }
}

export default APIClient;
