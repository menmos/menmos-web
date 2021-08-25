import moment from "moment";

export const isAuthenticated = (): boolean => {
  const authToken = localStorage.getItem("menmos-web-token");

  if (!authToken) {
    return false;
  }

  const { expiry } = JSON.parse(authToken) as {
    expiry: string;
  };

  return moment(expiry).isAfter(moment());
};

export const logout = (): void => {
  localStorage.removeItem("menmos-web-token");
};
