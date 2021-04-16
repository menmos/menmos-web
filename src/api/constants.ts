import { AxiosRequestConfig } from "axios";

export const axiosConfig: AxiosRequestConfig = {
  baseURL: process.env["NEXT_PUBLIC_BASE_URL"] || "",
};
