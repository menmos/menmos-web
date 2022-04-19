import React, { FC } from 'react'

import useAuth, { getUsername } from './utils/use-auth'

import Profile from './profile'

import * as styles from '../styles/header.module.scss'

export interface Properties {
  hide?: boolean
  children?: React.ReactNode
}

const Header: FC<Properties> = (properties) => {
  const { isAuthenticated } = useAuth()

  const Logo = () => {
    return <span className={styles['logo']}>MENMOS</span>
  }

  return (
    <header className={styles['header']}>
      <nav>
        <Logo />
        {isAuthenticated() && <Profile username={getUsername() || 'Username'} />}
        {!properties.hide && <div className={styles['content']}>{properties.children}</div>}
      </nav>
    </header>
  )
}

export default Header
