import React, { FC, useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import styles from "../styles/home.module.scss";
import Layout from "../components/layout";
import { isAuthenticated } from "../src/utils/auth";
import { Grid } from "../components/grid";
import { debounce } from "../components/utils/debounce";
import { query, Blob, DEFAULT_PARAMS } from "../src/api/query";
import { Card } from "../components/card";

export const Home: FC = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [blobs, setBlobs] = useState<Blob[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      void router.push("/login");
    }

    setIsLoading(false);
    setSearch(""); // Empty search by default, returns everything.
  }, [isLoading, router]);

  const onSearch = useCallback(
    debounce((value: string) => {
      setSearch(value.trim());
      setBlobs([]);
      setPage(0);
      setTotal(0);
    }, 500),
    []
  );

  useEffect(() => {
    if (!search) {
      return;
    }

    doSearch();
  }, [search]);

  // TODO: Move this into it's own Component (e.g. Container)
  const doSearch = async () => {
    const { size } = DEFAULT_PARAMS;
    const from = page * size;

    if (!search || (total && from >= total)) {
      return;
    }

    await query(search, { from, size })
      .then((data) => {
        setBlobs((previousBlobs) => [...previousBlobs, ...data.hits]);
        setTotal(data.total);
        setPage((previousPage) => previousPage + 1);
      })
      .catch(() => {
        // TODO: Handle errors
      });
  };

  return (
    <>
      {!isLoading && (
        <>
          <Head>
            <title>Menmos</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Layout
            overrides={{
              Header: {
                props: {
                  children: (
                    <>
                      <div className={styles["search"]}>
                        <input
                          onChange={(event) => onSearch(event.target.value)}
                          placeholder={"Search..."}
                          required
                        />
                      </div>
                    </>
                  ),
                },
              },
            }}
          >
            {blobs.length > 0 && (
              <Grid loadMore={doSearch}>
                {blobs.map((blob, index) => (
                  <Card key={index} blob={blob} />
                ))}
              </Grid>
            )}
          </Layout>
        </>
      )}
    </>
  );
};

export default Home;
