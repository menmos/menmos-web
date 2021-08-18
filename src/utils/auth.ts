import moment from "moment";

export const isAuthenticated = (): boolean => {
  const authToken = localStorage.getItem("menmos-web-token");

  if (!authToken) {
    console.log(" authenticated", false);
    return false;
  }

  const { expiry } = JSON.parse(authToken) as {
    expiry: string;
  };

  return moment(expiry).isAfter(moment());
};
