import React, { FC } from 'react'
import mime from 'mime/lite'

import * as styles from '../../styles/card.module.scss'

import { Blob } from '../../api/query'
import { ImageCard } from './types/images'
import { PDFCard } from './types/pdf'
import { FileCard } from './types/file'

export interface Properties {
  blob: Blob
  onLoad?: () => void
  onClick: () => void
}

const CardContent = (blob: Blob, onLoad: (() => void) | undefined) => {
  const extension = mime.getType(blob.meta.fields['extension'] || '')

  // FIXME: Disabling folder display for now
  //if (blob.meta.blob_type == BlobType.Directory) {
  //return <DirectoryCard blob={blob} onLoad={onLoad} />
  //} else
  if (extension?.includes('image')) {
    return <ImageCard blob={blob} onLoad={onLoad} />
  } else if (extension?.includes('pdf')) {
    return <PDFCard blob={blob} onLoad={onLoad} />
  } else {
    return <FileCard blob={blob} onLoad={onLoad} />
  }
}

export const Card: FC<Properties> = (properties): JSX.Element => {
  const { blob, onLoad, onClick } = properties

  return (
    <div className={styles['card']} role={'img'}>
      <div onClick={onClick} role="button" tabIndex={0}>
        {CardContent(blob, onLoad)}
      </div>
    </div>
  )
}
