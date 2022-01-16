import React, { FC, useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import styles from "../styles/home.module.scss";
import Layout from "../components/layout";
import { isAuthenticated } from "../src/utils/auth";
import { InfiniteScroll } from "../components/infiniteScroll";
import { debounce } from "../components/utils/debounce";

export const Home: FC = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
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
      setSearch(value);
    }, 500),
    []
  );

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
            <div className={styles["container"]}>
              <InfiniteScroll search={search} />
            </div>
          </Layout>
        </>
      )}
    </>
  );
};

export default Home;
