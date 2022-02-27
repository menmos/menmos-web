import React, { FC } from 'react'
import * as styles from '../styles/footer.module.scss'

const Footer: FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles['footer']}>
      <span className={styles['content']}>&copy; Menmos {currentYear}</span>
    </footer>
  )
}

export default Footer
