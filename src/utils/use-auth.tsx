import React, { FC } from 'react'
import { login } from '../api/auth'

interface Token {
  token: string
  expiry: string
}

interface Auth {
  isAuthenticated(): boolean
  login(username: string, password: string): Promise<void>
}

const TOKEN_KEY = 'menmos-web-token'
const USERNAME_KEY = 'menmos-web-username'

export const getUsername = (): string | undefined => {
  const username = localStorage.getItem(USERNAME_KEY)

  if (!username) {
    return undefined
  }

  return username
}
export const getToken = (): string | undefined => {
  const authToken = localStorage.getItem(TOKEN_KEY)

  if (!authToken) {
    return undefined
  }

  const { token } = JSON.parse(authToken) as Token

  return token
}
export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USERNAME_KEY)
}

const useAuth = () => {
  return {
    isAuthenticated(): boolean {
      const authToken = localStorage.getItem(TOKEN_KEY)

      if (!authToken) {
        return false
      }

      const { expiry } = JSON.parse(authToken) as Token

      return new Date(expiry) > new Date()
    },
    async login(username: string, password: string): Promise<void> {
      const token = await login(username, password)

      const expiry = new Date().setHours(new Date().getHours() + 6)
      localStorage.setItem(TOKEN_KEY, JSON.stringify({ token, expiry }))

      localStorage.setItem(USERNAME_KEY, username)
    }
  }
}

// eslint-disable-next-line react-hooks/rules-of-hooks
const authContext = React.createContext<Auth>(useAuth())

export const AuthProvider: FC = ({ children }) => {
  const auth = useAuth()

  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export default function AuthConsumer(): Auth {
  return React.useContext(authContext)
}
