import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";

import styles from "../styles/card.module.scss";

import { Blob, BlobType } from "../src/api/query";

export interface Properties {
  blob: Blob
}

export const Card: FC<Properties> = (properties): JSX.Element => {

    const blob = properties.blob;

    if (blob.meta.blob_type == BlobType.Directory) {
        return (<div className={styles["image-item"]}  onClick={() => window?.open(properties.blob.url, "_blank")?.focus()}>
            <div className={styles["media-box"]}>
                <FontAwesomeIcon icon={faFolder} />
                <span>{properties.blob.meta.name}</span>
            </div>
        </div>)
    }

    // The blob is a file.
    return (
        <div className={styles["image-item"]}  onClick={() => window?.open(properties.blob.url, "_blank")?.focus()}>
            <div className={styles["media-box"]}>
                <img src={properties.blob.url}></img>
            </div>
        </div>
    );

}
