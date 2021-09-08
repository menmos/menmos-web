import moment from "moment";

const TOKEN_KEY = "menmos-web-token";

interface Token {
  token: string;
  expiry: string;
}

export const isAuthenticated = (): boolean => {
  const authToken = localStorage.getItem(TOKEN_KEY);

  if (!authToken) {
    return false;
  }

  const { expiry } = JSON.parse(authToken) as Token;

  return moment(expiry).isAfter(moment());
};

export const setToken = (token: string): void => {
  const expiry: string = moment().add(6, "hours").toISOString();
  localStorage.setItem(TOKEN_KEY, JSON.stringify({ token, expiry }));
};

export const getToken = (): string | undefined => {
  const authToken = localStorage.getItem(TOKEN_KEY);

  if (!authToken) {
    return undefined;
  }

  const { token } = JSON.parse(authToken) as Token;

  return token;
};

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};
