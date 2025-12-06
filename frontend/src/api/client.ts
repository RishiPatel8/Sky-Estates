import axios from "axios";

// Always talk to the backend on http://localhost:4000/api in this setup.
// This keeps login/signup working whether you open the UI via Vite (5173)
// or via the combined Express server (4000).
export const api = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("skyline_token");
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ??
      error.message ??
      "Network error. Please retry.";
    return Promise.reject(new Error(message));
  }
);

