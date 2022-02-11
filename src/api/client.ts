import axios, { AxiosError } from "axios";

import history from "../utils/history";
import { getToken, logout } from "../utils/useAuth";

// TODO: Throw exception when environment variable is undefined
export const httpClient = axios.create({
  baseURL: process.env["PUBLIC_URL"],
});

httpClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  async (error) => {
    await Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 400) {
      logout();
      history.push("/");
    }
  }
);
