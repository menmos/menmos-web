import React, { FC } from 'react'
import { Modal, Divider, Chip, TableContainer, Table, Paper, TableCell, TableBody, TableRow } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import mime from 'mime/lite'

import * as styles from '../../styles/preview.module.scss'

import { Blob } from '../../api/query'
import { ImagePreview } from './types/images'
import { PDFPreview } from './types/pdf'
import { VideoPreview } from './types/video'

export interface Properties {
  blob?: Blob
  onClose: () => void
}

const PreviewContent = (blob: Blob) => {
  const extension = mime.getType(blob.meta.fields['extension'] || '')

  // TODO: Display all supported types
  if (extension?.includes('image')) {
    return <ImagePreview blob={blob} />
  } else if (extension?.includes('pdf')) {
    return <PDFPreview blob={blob} />
  } else if (extension?.includes('video')) {
    return <VideoPreview blob={blob} extension={extension} />
  }

  return
}

export const Preview: FC<Properties> = (properties): JSX.Element => {
  const { blob, onClose } = properties

  return (
    <Modal
      open={!!blob}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {(blob && (
        <div className={styles['preview']}>
          <div className={styles['content']}>{PreviewContent(blob)}</div>
          <div className={styles['blob-details']}>
            <h3>
              {blob.meta.fields['name']}{' '}
              <a href={blob.url} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="xs" />
              </a>
            </h3>

            <Divider light />

            <div>
              <h4>Tags</h4>
              <p>+ Add tags</p>
              {blob.meta.tags.map((value, index) => (
                <Chip key={index} label={value} />
              ))}
            </div>

            <div>
              <h4>Fields</h4>
              <p>+ Add fields</p>
              {/** TODO: Investigate using editable DataGrids instead: https://mui.com/components/data-grid/editing/ */}
              <TableContainer component={Paper}>
                <Table aria-label="simple table" size="small">
                  <TableBody>
                    {Object.entries(blob.meta.fields).map(([key, value], index) => (
                      <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>{key}</TableCell>
                        <TableCell align="right">{value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      )) || <></>}
    </Modal>
  )
}
