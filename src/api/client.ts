import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";

import * as auth from "../utils/auth";

// TODO: Throw exception when environment variable is undefined
export const httpClient = axios.create({
  baseURL: process.env["NEXT_PUBLIC_BASE_URL"],
});

httpClient.interceptors.request.use(
  (config) => {
    const token = auth.getToken();
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }

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
      const router = useRouter();

      auth.logout();
      await router.push("/");
    }
  }
);
