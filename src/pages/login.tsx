import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, TextField } from '@mui/material'

import Layout from '../components/layout'
import useAuth from '../components/utils/use-auth'

import * as styles from '../styles/login.module.scss'

export const Login: FC = () => {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()

  const [fields, setFields] = useState<{ username: string; password: string }>({
    username: '',
    password: ''
  })

  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/')
    }
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target

    setFields((previousState) => ({
      ...previousState,
      [id]: value
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await login(fields.username, fields.password)

      setError('')
      navigate('/')
    } catch (error) {
      console.error(error)
      // TODO: Check HTTP status before assuming it's a username-password problem
      setError('Authentication failed')
    }
  }

  return (
    <Layout>
      <div className={styles['container']}>
        <div className={styles['form-container']}>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <span className={styles['title']}>Login</span>
            <TextField
              fullWidth
              margin="normal"
              variant="standard"
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={fields.username}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              variant="standard"
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={fields.password}
              onChange={handleChange}
            />

            {error && <p className={styles['error']}>{error}</p>}
            <Button id="btn-login" color="secondary" variant="contained" type="submit">
              Log in
            </Button>
          </Box>
        </div>
      </div>
    </Layout>
  )
}

export default Login
