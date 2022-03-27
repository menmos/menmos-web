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
  const [value, setValue] = useState<string>('')
  const [hasError, setHasError] = useState<boolean>(false)

  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const searchParameterName = 'query'

  useEffect(() => {
    if (!isLoading) {
      return
    }

    if (!isAuthenticated()) {
      navigate('login')
    }

    const searchParameters = new URLSearchParams(window.location.search)
    const query = searchParameters.get(searchParameterName)

    setIsLoading(false)
    setHasError(false)

    if (query) {
      const parsedQuery = decodeURIComponent(query)

      setSearch(parsedQuery)
      setValue(parsedQuery)
    } else {
      setSearch('')
      setValue('')
    }
  }, [isLoading, isAuthenticated, navigate])

  const onSearch = useCallback((value: string) => {
    value = value.trim()

    setHasError(false)
    setValue(value)

    const searchParameters = new URLSearchParams(window.location.search)
    searchParameters.set(searchParameterName, encodeURIComponent(value))

    // Updates the URL with the new or updated query parameter
    const newUrl = `${window.location.pathname}?${searchParameters.toString()}`
    history.pushState(undefined, '', newUrl)

    debounce((value: string) => {
      setSearch(value)
    }, 500)(value)
  }, [])

  const onError = useCallback(() => setHasError(true), [])

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
                      <input
                        className={hasError ? styles['error'] : undefined}
                        value={value}
                        onChange={(event) => onSearch(event.target.value)}
                        placeholder={'Search...'}
                        required
                      />
                    </div>
                  </>
                )
              }
            }
          }}
        >
          <Content search={search} onError={onError} />
        </Layout>
      )}
    </>
  )
}

export default Home
