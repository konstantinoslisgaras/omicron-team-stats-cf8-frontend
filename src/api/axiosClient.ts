import axios from "axios";
import type { InternalAxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { API_URL } from "../config/api";

const axiosClient = axios.create({
    baseURL: API_URL,
});

axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const isAuthEndpoint = config.url?.startsWith("/auth/");

    if (!isAuthEndpoint) {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers = config.headers ?? ({} as AxiosRequestHeaders);
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

axiosClient.interceptors.response.use(
    (res) => res,
    (err) => {
        const url = err?.config?.url || "";
        if (url.includes("/auth/")) {
            return Promise.reject(err);
        }

        if (err?.response?.status === 401) {
            console.error("401 Unauthorized! Token might be missing or invalid.", err.response.data);
            localStorage.removeItem("access_token");
            window.location.href = "/api/login";
        }
        return Promise.reject(err);
    }
);

export default axiosClient;