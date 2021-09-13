import { httpClient } from "./client";

enum BlobType {
  File,
  Directory,
}

export interface Blob {
  id: string;
  meta: {
    name: string;
    blob_type: BlobType;
    metadata: {
      extension: string;
    };
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

const DEFAULT_PARAMS = {
  from: 0,
  size: 12,
  sign_urls: true,
  facets: true,
};

export const query = async (expression: string): Promise<Query> => {
  return httpClient
    .post<Query>("/query", {
      expression,
      ...DEFAULT_PARAMS,
    })
    .then((response) => response.data);
};
