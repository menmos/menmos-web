import * as React from "react";
import moment from "moment";
import { login } from "../api/auth";

interface Token {
  token: string;
  expiry: string;
}

interface Auth {
  isAuthenticated(): boolean;
  login(username: string, password: string): Promise<void>;
}

const TOKEN_KEY = "menmos-web-token";
const USERNAME_KEY = "menmos-web-username";

export const getUsername = (): string | undefined => {
  const username = localStorage.getItem(USERNAME_KEY);

  if (!username) {
    return undefined;
  }

  return username;
};
export const getToken = (): string | undefined => {
  const authToken = localStorage.getItem(TOKEN_KEY);

  if (!authToken) {
    return undefined;
  }

  const { token } = JSON.parse(authToken) as Token;

  return token;
};
export const logout = () => {
  return new Promise<void>(async (resolve) => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);

    resolve();
  });
};

const useAuth = () => {
  return {
    isAuthenticated(): boolean {
      const authToken = localStorage.getItem(TOKEN_KEY);

      if (!authToken) {
        return false;
      }

      const { expiry } = JSON.parse(authToken) as Token;

      return moment(expiry).isAfter(moment());
    },
    login(username: string, password: string) {
      return new Promise<void>(async (resolve) => {
        const token = await login(username, password);

        const expiry: string = moment().add(6, "hours").toISOString();
        localStorage.setItem(TOKEN_KEY, JSON.stringify({ token, expiry }));

        localStorage.setItem(USERNAME_KEY, username);

        resolve();
      });
    },
  };
};

const authContext = React.createContext<Auth>(useAuth());

export const AuthProvider: React.FC = ({ children }) => {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export default function AuthConsumer() {
  return React.useContext(authContext);
}
