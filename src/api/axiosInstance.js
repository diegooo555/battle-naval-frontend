import axios from "axios";

const URL_BACKEND = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: URL_BACKEND,
});

export default axiosInstance;