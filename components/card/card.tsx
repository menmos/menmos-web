import React, { FC } from "react";
import mime from "mime/lite";

import styles from "../../styles/card.module.scss";

import { Blob, BlobType } from "../../src/api/query";
import { DirectoryCard } from "./types/directory";
import { ImageCard } from "./types/images";
import { PDFCard } from "./types/pdf";
import { FileCard } from "./types/file";

export interface Properties {
  blob: Blob;
  onLoad?: () => void;
}

const CardContent = (blob: Blob, onLoad: (() => void) | undefined) => {
  const extension = mime.getType(blob.meta.name);

  if (blob.meta.blob_type == BlobType.Directory) {
    return <DirectoryCard blob={blob} onLoad={onLoad} />;
  } else if (extension?.includes("image")) {
    return <ImageCard blob={blob} onLoad={onLoad} />;
  } else if (extension?.includes("pdf")) {
    return <PDFCard blob={blob} onLoad={onLoad} />;
  } else {
    return <FileCard blob={blob} onLoad={onLoad} />;
  }
};

export const Card: FC<Properties> = (properties): JSX.Element => {
  const { blob, onLoad } = properties;

  return (
    <div
      className={styles["card"]}
      onClick={() => window?.open(properties.blob.url, "_blank")?.focus()}
    >
      {CardContent(blob, onLoad)}
    </div>
  );
};
