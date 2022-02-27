import React from 'react'
import ReactDOM from 'react-dom'
import { unstable_HistoryRouter as HistoryRouter, Route, Routes } from 'react-router-dom'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'

import history from '../utils/history'
import { Home } from './home'
import Login from './login'
import theme from './theme'

import '../styles/globals.scss'

const app = document.querySelector('#app')
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </HistoryRouter>
  </ThemeProvider>,
  app
)
