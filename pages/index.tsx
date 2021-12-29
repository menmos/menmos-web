import React, { FC, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import styles from "../styles/home.module.scss";
import Layout from "../components/layout";
import { isAuthenticated } from "../src/utils/auth";
import Blobs from "../components/blobs";

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
                          onChange={(event) => setSearch(event.target.value)}
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
              <Blobs search={search} />
            </div>
          </Layout>
        </>
      )}
    </>
  );
};

export default Home;
