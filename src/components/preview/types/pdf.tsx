import React, { FC } from 'react'

import { Blob } from '../../../api/query'

export interface Properties {
  blob: Blob
}

export const PDFPreview: FC<Properties> = ({ blob }) => {
  return <iframe src={blob.url} title={blob.meta.fields['name'] || blob.id} frameBorder="0" allowFullScreen />
}
