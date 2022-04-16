import React, { FC, useCallback, useEffect, useState } from 'react'

import { Grid } from './grid'
import { Blob, DEFAULT_PARAMS, query } from '../api/query'
import { Card } from './card/card'
import { Preview } from './preview/preview'
import { deleteQueryParameter, getQueryParameter, setQueryParameter } from './utils/url'

interface Properties {
  search: string
  onError?: () => void
}

export const Content: FC<Properties> = ({ search, onError }): JSX.Element => {
  const [blobs, setBlobs] = useState<Blob[]>([])
  const [total, setTotal] = useState<number>(0)
  const [page, setPage] = useState<number>(0)
  const [nbLoaded, setNbLoaded] = useState<number>(0)
  const [currentBlob, setCurrentBlob] = useState<Blob | undefined>()

  const searchParameterName = 'blob'

  useEffect(() => {
    if (blobs.length === 0) {
      return
    }

    const blobId = getQueryParameter(searchParameterName)
    if (!blobId) {
      return
    }

    const blob = blobs.find((b) => b.id === blobId)
    if (!blob) {
      return
    }

    setCurrentBlob(blob)
  }, [blobs])

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

      onError?.()
    }
  }, [page, total, search, blobs.length, nbLoaded, onError])

  const onLoad = useCallback(() => {
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

  const onClick = (blob: Blob) => {
    setQueryParameter(searchParameterName, blob.id)

    setCurrentBlob(blob)
  }

  const onClose = () => {
    deleteQueryParameter(searchParameterName)

    // eslint-disable-next-line unicorn/no-useless-undefined
    setCurrentBlob(undefined)
  }

  return (
    <section>
      {blobs.length > 0 && (
        <Grid loadMore={loadMore} hasLoaded={nbLoaded === blobs.length}>
          {blobs.map((blob, index) => (
            <Card key={index} blob={blob} onLoad={onLoad} onClick={() => onClick(blob)} />
          ))}
        </Grid>
      )}
      <Preview blob={currentBlob} onClose={onClose} />
    </section>
  )
}

export default Content
