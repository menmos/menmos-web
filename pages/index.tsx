import React, { FC, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import styles from "../styles/home.module.scss";
import Layout from "../components/layout";
import { isAuthenticated } from "../src/utils/auth";

export const Home: FC = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      void router.push("/login");
    }

    setIsLoading(false);
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
                      <div>Header</div>
                    </>
                  ),
                },
              },
            }}
          >
            <div className={styles["container"]}></div>
          </Layout>
        </>
      )}
    </>
  );
};

export default Home;
