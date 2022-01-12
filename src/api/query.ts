import { httpClient } from "./client";

export enum BlobType {
  File = "File",
  Directory = "Directory",
}

export interface Blob {
  id: string;
  meta: {
    name: string;
    blob_type: BlobType;
    metadata: { [key: string]: string };
    tags: Array<string>;
    parents: Array<string>;
    size: number;
    created_at: string;
    modified_at: string;
  };
  url: string;
}

interface Facets {
  tags: { [tag: string]: number };
  meta: { [meta: string]: { [key: string]: number } };
}

export interface Query {
  count: number;
  facets: Facets | null;
  hits: Array<Blob>;
  total: number;
}

export const DEFAULT_PARAMS = {
  from: 0,
  size: 10,
  sign_urls: true,
  facets: true,
};

export interface Pagination {
  from: number;
  size: number;
}

export const query = async (
  expression: string,
  options?: Pagination
): Promise<Query> => {
  let params = DEFAULT_PARAMS;
  if (options) {
    params = { ...params, ...options };
  }

  return httpClient
    .post<Query>("/query", {
      expression,
      ...params,
    })
    .then((response) => response.data);
};
