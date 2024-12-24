import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Token'ı localStorage'dan al
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Authorization başlığına token ekle
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Hata durumunda isteği reddet
  }
);

export default instance;
