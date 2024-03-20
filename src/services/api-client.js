import axios from "axios";

export default axios.create({
    baseURL: "https://university-magazine-backend.onrender.com/api/v1",
    headers: {
        'Content-Type': 'multipart/form-data',
      },
})