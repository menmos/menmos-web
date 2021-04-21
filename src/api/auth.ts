import axios from "axios";

// TODO: Throw exception when environment variable is undefined
const httpClient = axios.create({
  baseURL: process.env["NEXT_PUBLIC_BASE_URL"],
});

export const login = async (
  username: string,
  password: string
): Promise<string> => {
  return httpClient
    .post<{ token: string }>("/auth/login", { username, password })
    .then((response) => response.data.token);
};
