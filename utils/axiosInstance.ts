import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://city-church-backend.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;
