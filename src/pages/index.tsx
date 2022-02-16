import React from 'react'
import ReactDOM from 'react-dom'
import { unstable_HistoryRouter as HistoryRouter, Route, Routes } from 'react-router-dom'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

import history from '../utils/history'
import { Home } from './home'
import Login from './login'

import '../styles/globals.scss'

config.autoAddCss = false

const app = document.querySelector('#app')
ReactDOM.render(
  <HistoryRouter history={history}>
    <Routes>
      <Route path="/" element={<Home />}>
        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <p>There&apos;s nothing here!</p>
            </main>
          }
        />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  </HistoryRouter>,
  app
)
