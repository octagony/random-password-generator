import Head from "next/head";
import Main from "../components/Main";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Easy/Pass</title>
        <meta name="description" content="Easy/Pass for your passwords" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Main/>
    </>
  );
}
