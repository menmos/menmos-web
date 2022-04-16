import React, { FC } from 'react'

import { Blob } from '../../../api/query'

export interface Properties {
  blob: Blob
  extension: string
}

export const VideoPreview: FC<Properties> = ({ blob, extension }) => {
  return (
    <video controls>
      <source src={blob.url} type={extension} />
      <track kind="captions" />
      Your browser does not support this video format: {extension}.
    </video>
  )
}
