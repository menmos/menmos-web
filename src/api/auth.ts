import axios from "axios";
import { axiosConfig } from "./constants";

export const LOCAL_STORAGE_TOKEN_KEY = "menmos-web-token";

export const login = async (
  username: string,
  password: string
): Promise<string | undefined> => {
  type TokenResponse = { token: string };
  try {
    const resp = await axios.post<TokenResponse>(
      "/auth/login",
      { username, password },
      axiosConfig
    );

    return resp.data.token;
  } catch {
    return;
  }
};
