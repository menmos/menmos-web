import moment from "moment";

const TOKEN_KEY = "menmos-web-token";
const USERNAME_KEY = "menmos-web-username";

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

export const setUsername = (username: string): void => {
  localStorage.setItem(USERNAME_KEY, username);
};

export const getUsername = (): string | undefined => {
  const username = localStorage.getItem(USERNAME_KEY);

  if (!username) {
    return undefined;
  }

  return username;
};

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USERNAME_KEY);
};
