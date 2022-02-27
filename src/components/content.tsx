import React, { FC, useCallback, useEffect, useState } from 'react'

import { Grid } from './grid'
import { query, DEFAULT_PARAMS, Blob } from '../api/query'
import { Card } from './card/card'

interface Properties {
  search: string
}

export const Content: FC<Properties> = ({ search }): JSX.Element => {
  const [blobs, setBlobs] = useState<Blob[]>([])
  const [total, setTotal] = useState<number>(0)
  const [page, setPage] = useState<number>(0)
  const [nbLoaded, setNbLoaded] = useState<number>(0)

  const loadMore = useCallback(async () => {
    const { size } = DEFAULT_PARAMS
    const from = page * size
    const hasMore = !total || from < total

    if (!search || !hasMore || !(nbLoaded === blobs.length)) {
      return
    }

    try {
      const results = await query(search, { from, size })

      if (results.count > 0) {
        setBlobs((previousBlobs) => [...previousBlobs, ...results.hits])
        setTotal(results.total)
        setPage((previousPage) => previousPage + 1)
      }
    } catch (error) {
      console.error('An error occurred while running the query', error)
    }
  }, [page, total, search, blobs.length, nbLoaded])

  const onload = useCallback(() => {
    setNbLoaded((previous) => previous + 1)
  }, [])

  useEffect(() => {
    setBlobs([])
    setTotal(0)
    setPage(0)
    setNbLoaded(0)
  }, [search])

  useEffect(() => {
    if (total === 0 && page === 0 && blobs.length === 0 && nbLoaded === 0 && search) {
      void loadMore()
    }
  }, [page, total, search, blobs.length, nbLoaded, loadMore])

  return (
    <section>
      {blobs.length > 0 && (
        <Grid loadMore={loadMore} hasLoaded={nbLoaded === blobs.length}>
          {blobs.map((blob, index) => (
            <Card key={index} blob={blob} onLoad={onload} />
          ))}
        </Grid>
      )}
    </section>
  )
}

export default Content
