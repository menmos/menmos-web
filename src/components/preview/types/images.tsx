import React, { FC } from 'react'

import { Blob } from '../../../api/query'

export interface Properties {
  blob: Blob
}

export const ImagePreview: FC<Properties> = ({ blob }) => {
  return <img src={blob.url} alt={blob.meta.fields['name'] || blob.id} />
}
