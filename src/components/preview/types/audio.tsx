import React, { FC } from 'react'

import { Blob } from '../../../api/query'

export interface Properties {
  blob: Blob
  extension: string
}

export const AudioPreview: FC<Properties> = ({ blob, extension }) => {
  return (
    <audio controls>
      <source src={blob.url} type={extension} />
      <track kind="captions" />
      Your browser does not support this audio format: {extension}.
    </audio>
  )
}
