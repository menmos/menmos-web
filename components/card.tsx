import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

import styles from "../styles/card.module.scss";

import { Blob, BlobType } from "../src/api/query";

export interface Properties {
  blob: Blob;
}

export const Card: FC<Properties> = (properties): JSX.Element => {
  const blob = properties.blob;

  if (blob.meta.blob_type == BlobType.Directory) {
    return (
      <div
        className={styles["image-item"]}
        onClick={() => window?.open(properties.blob.url, "_blank")?.focus()}
        aria-hidden="true"
      >
        <div className={styles["media-box"]}>
          <FontAwesomeIcon icon={faFolder} />
          <span>{properties.blob.meta.name}</span>
        </div>
      </div>
    );
  }

  // The blob is a file.
  // TODO: Detect content-type and display different content-types properly.
  return (
    <div
      className={styles["image-item"]}
      onClick={() => window?.open(properties.blob.url, "_blank")?.focus()}
      aria-hidden="true"
    >
      <div className={styles["media-box"]}>
        <Image
          alt={properties.blob.meta.name}
          src={properties.blob.url}
          layout="fill"
        ></Image>
      </div>
    </div>
  );
};
