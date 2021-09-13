import React, { FC, useEffect, useState } from "react";

import { query, Blob } from "../src/api/query";
import { humanReadableFileSize } from "../src/utils/blob";
import { humanReadableDate } from "../src/utils/date";

import styles from "../styles/blobs.module.scss";
import Spinner from "./spinner";

export interface Properties {
  search: string;
}

export const Blobs: FC<Properties> = (properties): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [blobs, setBlobs] = useState<Blob[]>([]);

  useEffect(() => {
    if (!properties.search) {
      return;
    }

    setIsLoading(true);

    void query(properties.search)
      .then((data) => setBlobs(data.hits))
      .then(() => setIsLoading(false))
      .catch(() => {
        // TODO: Handle errors
      });
  }, [properties.search]);

  const renderTableHeader = () => {
    if (blobs.length === 0) {
      return;
    }

    return (
      <tr>
        <th key={1}>Type</th>
        <th key={0}>Name</th>
        <th key={2}>Tags</th>
        <th key={3}>Size</th>
        <th key={4}>Created at</th>
        <th key={5}>Modified at</th>
      </tr>
    );
  };

  const renderTableData = () => {
    if (blobs.length === 0) {
      return;
    }

    return blobs.map((blob, index) => {
      const { url, meta } = blob;
      return (
        <tr key={index} onClick={() => window?.open(url, "_blank")?.focus()}>
          <td>{meta.blob_type}</td>
          <td>
            <a href={url} target="_blank" rel="noreferrer">
              {meta.name}
            </a>
          </td>
          <td>{meta.tags.join(", ")}</td>
          <td>{humanReadableFileSize(meta.size)}</td>
          <td>{humanReadableDate(meta.created_at)}</td>
          <td>{humanReadableDate(meta.modified_at)}</td>
        </tr>
      );
    });
  };

  return (
    <div className={styles["blobs"]}>
      {!isLoading && blobs.length > 0 && (
        <table>
          <thead>{renderTableHeader()}</thead>
          <tbody>{renderTableData()}</tbody>
        </table>
      )}
      {isLoading && <Spinner />}
    </div>
  );
};

export default Blobs;
