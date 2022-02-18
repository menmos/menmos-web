import React, { FC } from 'react'

import { Blob } from '../../../api/query'

export interface Properties {
  blob: Blob
  onLoad?: () => void
}

export const ImageCard: FC<Properties> = ({ blob, onLoad }) => {
  return <img src={blob.url} alt={blob.meta.fields['name'] || blob.id} onLoad={onLoad} />
}
