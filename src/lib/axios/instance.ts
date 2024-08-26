import axios from "axios";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "cache-control": "no-cache",
  expire: 0,
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers,
  timeout: 60 * 1000,
});

// Menambahkan interceptor untuk menangani respons
instance.interceptors.response.use(
  (config) => config,
  (error) => Promise.reject(error)
);

instance.interceptors.request.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default instance;
