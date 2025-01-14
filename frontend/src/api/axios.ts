// src/axiosInstance.ts
import axios, { AxiosInstance } from "axios";

// Access the port from the environment variable VITE_BACKEND_PORT
const port = import.meta.env.VITE_BACKEND_PORT || "8000"; // Default to '8000' if not set

const baseURLApi = `http://localhost:${port}/api`;

// Create and export the axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseURLApi,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
