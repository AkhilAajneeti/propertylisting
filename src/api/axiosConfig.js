import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API, // Environment-based backend URL ✔
  timeout: 10000, // optional but recommended

});

export default api;
