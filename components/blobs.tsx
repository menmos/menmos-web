import React, { FC, useEffect, useState } from "react";

import { query, Blob, Pagination, DEFAULT_PARAMS } from "../src/api/query";
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
  const [total, setTotal] = useState<number>(0);
  const [from, setFrom] = useState<number>(0);

  useEffect(() => {
    if (!properties.search) {
      return;
    }

    setTotal(0);
    setFrom(0);

    void search(properties.search);

    setIsLoading(true);
  }, [properties.search]);

  const search = async (expression: string, options?: Pagination) => {
    void query(expression, options)
      .then((data) => {
        setBlobs(data.hits);
        setTotal(data.total);
      })
      .then(() => setIsLoading(false))
      .catch(() => {
        // TODO: Handle errors
      });
  };

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

  const renderPagination = () => {
    const up = async () => {
      const MAX = total;
      if (from + DEFAULT_PARAMS.size > MAX) {
        return;
      }

      setFrom(from + DEFAULT_PARAMS.size);
      await search(properties.search, { from: from + DEFAULT_PARAMS.size });
    };

    const down = async () => {
      const MIN = 0;
      if (from - DEFAULT_PARAMS.size < MIN) {
        return;
      }

      setFrom(from - DEFAULT_PARAMS.size);
      await search(properties.search, { from: from - DEFAULT_PARAMS.size });
    };

    return (
      <div className="pagination">
        <span>
          {from + 1}-{Math.min(from + DEFAULT_PARAMS.size, total)} of {total}
        </span>
        <div className="actions">
          <button onClick={down}>&lt;</button>
          <button onClick={up}>&gt;</button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles["blobs"]}>
      {!isLoading && blobs.length > 0 && (
        <>
          <table>
            <thead>{renderTableHeader()}</thead>
            <tbody>{renderTableData()}</tbody>
          </table>
          {renderPagination()}
        </>
      )}
      {isLoading && <Spinner />}
    </div>
  );
};

export default Blobs;
