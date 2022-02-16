import { httpClient } from './client'

export const login = async (username: string, password: string): Promise<string> => {
  return httpClient
    .post<{ token: string }>('/auth/login', { username, password })
    .then((response) => response.data.token)
}
