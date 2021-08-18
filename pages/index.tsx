import React, { FC, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import Layout from "../components/layout";
import { isAuthenticated } from "../src/utils/auth";

export const Home: FC = (): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      void router.push("/login");
    }
  });

  return (
    <>
      <Head>
        <title>Menmos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>LOGGED IN</Layout>
    </>
  );
};

export default Home;
