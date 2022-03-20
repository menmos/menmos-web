import React, { FC, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Layout from '../components/layout'
import useAuth from '../components/utils/use-auth'
import { debounce } from '../components/utils/debounce'
import { Content } from '../components/content'

import * as styles from '../styles/home.module.scss'

export const Home: FC = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [search, setSearch] = useState<string>('')

  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading) {
      return
    }

    if (!isAuthenticated()) {
      navigate('login')
    }

    setIsLoading(false)
    setSearch('')
  }, [isLoading, isAuthenticated, navigate])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSearch = useCallback(
    debounce((value: string) => {
      setSearch(value.trim())
    }, 500),
    []
  )

  return (
    <>
      {!isLoading && (
        <Layout
          overrides={{
            Header: {
              props: {
                children: (
                  <>
                    <div className={styles['search']} id="search">
                      <input onChange={(event) => onSearch(event.target.value)} placeholder={'Search...'} required />
                    </div>
                  </>
                )
              }
            }
          }}
        >
          <Content search={search} />
        </Layout>
      )}
    </>
  )
}

export default Home
