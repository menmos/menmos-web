import React, { FC } from 'react'

import * as styles from '../styles/spinner.module.scss'

const Spinner: FC = () => {
  return (
    <div className={styles['lds-ellipsis']}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Spinner
