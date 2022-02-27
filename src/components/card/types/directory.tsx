import React, { FC, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'

import { Blob } from '../../../api/query'

export interface Properties {
  blob: Blob
  onLoad?: () => void
}

export const DirectoryCard: FC<Properties> = ({ blob, onLoad }) => {
  useEffect(() => {
    onLoad?.()
  }, [onLoad])

  return (
    <div>
      <FontAwesomeIcon icon={faFolder} size="10x" />
      <span>{blob.meta.fields['name'] || blob.id}</span>
    </div>
  )
}
