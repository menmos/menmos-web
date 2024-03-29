import { httpClient } from './client'

export interface Blob {
  id: string
  meta: {
    fields: { [key: string]: string }
    tags: Array<string>
    size: number
    created_at: string
    modified_at: string
  }
  url: string
}

interface Facets {
  tags: { [tag: string]: number }
  meta: { [meta: string]: { [key: string]: number } }
}

export interface QueryResult {
  count: number
  facets: Facets | null
  hits: Array<Blob>
  total: number
}

export const DEFAULT_PARAMS = {
  from: 0,
  size: 50,
  sign_urls: true,
  facets: true
}

export interface Pagination {
  from: number
  size: number
}

export const query = async (expression: string, options?: Pagination): Promise<QueryResult> => {
  let parameters = DEFAULT_PARAMS
  if (options) {
    parameters = { ...parameters, ...options }
  }

  return httpClient
    .post<QueryResult>('/query', {
      expression,
      ...parameters
    })
    .then((response) => response.data)
}
