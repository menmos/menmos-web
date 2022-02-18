import React, { FC } from 'react'
import mime from 'mime/lite'

import styles from '../../styles/card.module.scss'

import { Blob } from '../../api/query'
import { ImageCard } from './types/images'
import { PDFCard } from './types/pdf'
import { FileCard } from './types/file'

export interface Properties {
  blob: Blob
  onLoad?: () => void
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
  const { blob, onLoad } = properties

  return (
    // TODO: Use an <a> tag instead of a <div> here
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
    <div className={styles['card']} onClick={() => window?.open(blob.url, '_blank')?.focus()} role={'img'}>
      {CardContent(blob, onLoad)}
    </div>
  )
}
