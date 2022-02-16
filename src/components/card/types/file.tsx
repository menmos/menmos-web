import React, { FC, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'

import { Blob } from '../../../api/query'

export interface Properties {
  blob: Blob
  onLoad?: () => void
}

export const FileCard: FC<Properties> = ({ blob, onLoad }) => {
  useEffect(() => {
    onLoad?.()
  }, [onLoad])

  return (
    <div>
      <FontAwesomeIcon icon={faFile} size="10x" />
      <span>{blob.meta.name}</span>
    </div>
  )
}
