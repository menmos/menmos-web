import React, { FC, useEffect, useRef } from "react";
import useState from "react-usestateref";
import { Blob, DEFAULT_PARAMS, Pagination, query } from "../src/api/query";
import { Card } from "./card";

import styles from "../styles/blobs.module.scss";

interface Properties {
  search: string;
}

export const InfiniteScroll: FC<Properties> = (properties): JSX.Element => {
  const loadingRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [blobs, setBlobs] = useState<Blob[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [_page, setPage, pageRef] = useState<number>(0);
  const [_total, setTotal, totalRef] = useState<number>(0);
  const [_prevY, setPrevY, prevYRef] = useState<number>(0);
  const [_search, setSearch, searchRef] = useState<string>(properties.search);

  // Additional css
  const loadingCSS = {
    height: "100px",
    margin: "30px",
  };

  // To change the loading icon behavior
  const loadingTextCSS = { display: loading ? "block" : "none" };

  useEffect(() => {
    if (!properties.search) {
      return;
    }

    setBlobs([]);
    setTotal(0);
    setPage(0);
    setPrevY(0);
    setSearch(properties.search);

    void search(properties.search, { from: 0, size: DEFAULT_PARAMS.size });
  }, [properties.search]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleObserver.bind(this), {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });
  }, []);

  useEffect(() => {
    if (!observerRef.current || !loadingRef.current) {
      return;
    }

    observerRef.current.observe(loadingRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [loadingRef]);

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

  const handleObserver = (entities: any, _: IntersectionObserver) => {
    const total = totalRef.current;
    const prevY = prevYRef.current;
    const page = pageRef.current;
    const searchExpression = searchRef.current;
    const from = (page + 1) * DEFAULT_PARAMS.size;

    if (total && from >= total) {
      return;
    }

    const y = entities[0].intersectionRect.y;
    if (y > prevY) {
      search(searchExpression, {
        from,
        size: DEFAULT_PARAMS.size,
      });

      setPage((previousPage) => previousPage + 1);
    }
    setPrevY(y);
  };

  return (
    <div className={styles["blobs"]}>
      <div className={styles["table-data"]} style={{ minHeight: "800px" }}>
        {blobs.map((blob, index) => (
          <Card key={index} blob={blob} />
        ))}
      </div>
      <div ref={loadingRef} style={loadingCSS}>
        <span style={loadingTextCSS}>Loading...</span>
      </div>
    </div>
  );
};
