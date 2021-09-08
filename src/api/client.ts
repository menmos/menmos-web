import axios from "axios";

// TODO: Throw exception when environment variable is undefined
export const httpClient = axios.create({
  baseURL: process.env["NEXT_PUBLIC_BASE_URL"],
});
