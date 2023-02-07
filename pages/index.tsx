import React from "react";
import Head from "next/head";
import Main from "../components/Main";

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Easy/Pass</title>
        <meta name="description" content="Easy/Pass for your passwords" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main />
    </>
  );
}
