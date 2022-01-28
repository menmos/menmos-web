import React, { FC, useEffect, useState } from "react";

import { query, Blob, Pagination, DEFAULT_PARAMS } from "../src/api/query";

import { Card } from "./card";

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

    void search(properties.search, { from: 0, size: DEFAULT_PARAMS.size });

    setIsLoading(true);
  }, [properties.search]);

  const search = async (expression: string, options?: Pagination) => {
    await query(expression, options)
      .then((data) => {
        setBlobs(data.hits);
        setTotal(data.total);
      })
      .then(() => setIsLoading(false))
      .catch(() => {
        // TODO: Handle errors
      });
  };

  const renderTableData = () => {
    return blobs.map((blob, index) => <Card key={index} blob={blob} />);
  };

  const renderPagination = () => {
    const up = async () => {
      const MAX = total;
      if (from + DEFAULT_PARAMS.size > MAX) {
        return;
      }

      setFrom(from + DEFAULT_PARAMS.size);
      await search(properties.search, {
        from: from + DEFAULT_PARAMS.size,
        size: DEFAULT_PARAMS.size,
      });
    };

    const down = async () => {
      const MIN = 0;
      if (from - DEFAULT_PARAMS.size < MIN) {
        return;
      }

      setFrom(from - DEFAULT_PARAMS.size);
      await search(properties.search, {
        from: from - DEFAULT_PARAMS.size,
        size: DEFAULT_PARAMS.size,
      });
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
          <div className={styles["image-grid"]}>{renderTableData()}</div>
          {renderPagination()}
        </>
      )}
      {isLoading && <Spinner />}
    </div>
  );
};

export default Blobs;
