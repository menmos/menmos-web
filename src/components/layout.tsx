import Header from './header'
import Footer from './footer'
import React, { FC } from 'react'

import * as styles from '../styles/layout.module.scss'
import { ComponentProperties, Components, getComponents } from './utils/get-components'

const defaultComponents = {
  Header: {
    component: Header,
    props: {}
  },
  Footer: {
    component: Footer,
    props: {}
  }
}
type ComponentNames = keyof typeof defaultComponents

type Properties = {
  overrides?: ComponentProperties<Components, ComponentNames>
}

const Content: FC = (properties) => <div className={styles['content']}>{properties.children}</div>

const Layout: FC<Properties> = (properties) => {
  const {
    Header: { props: headerProperties },
    Footer: { props: footerProperties }
  } = getComponents(defaultComponents, properties.overrides)

  return (
    <div className={styles['layout']}>
      <Header {...headerProperties} />
      <Content>{properties.children}</Content>
      <Footer {...footerProperties} />
    </div>
  )
}

export default Layout

export type { Properties as HeaderProperties } from './header'
