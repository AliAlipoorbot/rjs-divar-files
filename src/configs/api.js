import axios from "axios";

import { getNewTokens } from "services/token";
import { getCookie, setCookie } from "utils/cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (req) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      req.headers["Authorization"] = `bearer ${accessToken}`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const res = await getNewTokens();
      if (!res?.response) return;
      console.log(res);

      setCookie(res.response.data);

      return api(originalRequest);
    }
  }
);

export default api;
