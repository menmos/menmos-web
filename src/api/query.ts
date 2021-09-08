import { getToken } from "../utils/auth";
import { httpClient } from "./client";

export interface Query {
  count: number;
  facets: any; // TODO:Change me
  hits: Array<any>; // TODO:Change me
  total: number;
}

const DEFAULT_PARAMS = {
  from: 0,
  size: 30,
  sign_urls: true,
  facets: true,
};

export const query = async (expression: string): Promise<Query> => {
  return httpClient
    .post<Query>(
      "/query",
      {
        expression,
        ...DEFAULT_PARAMS,
      },
      {
        headers: { Authorization: `Bearer ${getToken() || ""}` },
      }
    )
    .then((response) => response.data);
};
