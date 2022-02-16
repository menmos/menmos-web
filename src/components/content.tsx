import React, { FC, useCallback, useEffect, useState } from "react";

import { Grid } from "./grid";
import { query, DEFAULT_PARAMS, Blob } from "../api/query";
import { Card } from "./card/card";

interface Properties {
  search: string;
}

export const Content: FC<Properties> = ({ search }): JSX.Element => {
  const [blobs, setBlobs] = useState<Blob[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [nbLoaded, setNbLoaded] = useState<number>(0);

  useEffect(() => {
    setBlobs([]);
    setTotal(0);
    setPage(0);
    setNbLoaded(0);
  }, [search]);

  useEffect(() => {
    if (
      total === 0 &&
      page === 0 &&
      blobs.length === 0 &&
      nbLoaded === 0 &&
      search
    ) {
      loadMore();
    }
  }, [total, page, blobs, nbLoaded]);

  const loadMore = useCallback(async () => {
    const { size } = DEFAULT_PARAMS;
    const from = page * size;
    const hasMore = !total || from < total;

    if (!search || !hasMore || !(nbLoaded === blobs.length)) {
      return;
    }

    await query(search, { from, size })
      .then((data) => {
        if (data.count > 0) {
          setBlobs((previousBlobs) => [...previousBlobs, ...data.hits]);
          setTotal(data.total);
          setPage((previousPage) => previousPage + 1);
        }
      })
      .catch(() => {
        // TODO: Handle errors
      });
  }, [page, total, search, nbLoaded]);

  const onload = useCallback(() => {
    setNbLoaded((prev) => prev + 1);
  }, [nbLoaded]);

  return (
    <section>
      {blobs.length > 0 && (
        <Grid loadMore={loadMore} hasLoaded={nbLoaded === blobs.length}>
          {blobs.map((blob, index) => (
            <Card key={index} blob={blob} onLoad={onload} />
          ))}
        </Grid>
      )}
    </section>
  );
};

export default Content;
