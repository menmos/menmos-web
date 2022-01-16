import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Blob, DEFAULT_PARAMS, Pagination, query } from "../src/api/query";
import { Card } from "./card";

import styles from "../styles/blobs.module.scss";

interface Properties {
  search: string;
}

export const InfiniteScroll: FC<Properties> = (properties): JSX.Element => {
  const loadingRef = useRef<HTMLDivElement>(null);
  const [blobs, setBlobs] = useState<Blob[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  // To change the loading icon behavior
  const loadingTextCSS = { display: loading ? "block" : "none" };

  useEffect(() => {
    if (!properties.search) {
      return;
    }

    setBlobs([]);
    setTotal(0);
    setPage(0);

    void search(properties.search, { from: 0, size: DEFAULT_PARAMS.size });
  }, [properties.search]);

  const handleObserver = useCallback(
    async (entities) => {
      console.log("handleObserver called", entities);
      const from = (page + 1) * DEFAULT_PARAMS.size;
      console.log(
        "from, page, total, properties.search",
        from,
        page,
        total,
        properties.search
      );
      if (!properties.search.trim() || (total && from >= total)) {
        return;
      }

      const target = entities[0];
      if (target.isIntersecting) {
        await search(properties.search, {
          from,
          size: DEFAULT_PARAMS.size,
        });

        setPage((previousPage) => previousPage + 1);
      }
    },
    [page]
  );

  useEffect(() => {
    if (!loadingRef.current) {
      return;
    }

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    observer.observe(loadingRef.current);

    return () => {
      observer.disconnect();
    };
  }, [handleObserver]);

  const search = async (expression: string, options?: Pagination) => {
    setLoading(true);

    void query(expression, options)
      .then((data) => {
        setBlobs((previousBlobs) => [...previousBlobs, ...data.hits]);
        setTotal(data.total);
        setLoading(false);
      })
      .catch(() => {
        // TODO: Handle errors
      });
  };

  return (
    <div className={styles["blobs"]}>
      <div className={styles["table-data"]}>
        {blobs.map((blob, index) => (
          <Card key={index} blob={blob} />
        ))}
      </div>
      <div ref={loadingRef}>
        <span style={loadingTextCSS}>Loading...</span>
      </div>
    </div>
  );
};
