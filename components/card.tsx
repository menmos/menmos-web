import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faFilePdf, faFile } from "@fortawesome/free-solid-svg-icons";
import mime from "mime/lite";

import styles from "../styles/card.module.scss";

import { Blob, BlobType } from "../src/api/query";

export interface Properties {
  blob: Blob;
  onLoad?: React.ReactEventHandler<HTMLImageElement>;
}

const CardContent = (
  blob: Blob,
  onLoad: React.ReactEventHandler<HTMLImageElement> | undefined
) => {
  const extension = mime.getType(blob.meta.name);

  if (blob.meta.blob_type == BlobType.Directory) {
    return (
      <>
        <FontAwesomeIcon icon={faFolder} />
        <span>{blob.meta.name}</span>
      </>
    );
  } else if (extension?.includes("image")) {
    return (
      <>
        <img src={blob.url} onLoad={onLoad} />
      </>
    );
  } else if (extension?.includes("pdf")) {
    return (
      <>
        <FontAwesomeIcon icon={faFilePdf} />
        <span>{blob.meta.name}</span>
      </>
    );
  } else {
    return (
      <>
        <FontAwesomeIcon icon={faFile} />
        <span>{blob.meta.name}</span>
      </>
    );
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
