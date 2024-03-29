import Link from "next/link";
import Head from "next/head";

const custom404 = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>We lost him...</title>
      </Head>
      <div className="flex flex-col justify-center items-center gap-6">
        <h2 className="text-5xl font-bold">404</h2>
        <p className="text-2xl font-bold">Oh-oh, page not found</p>
        <Link href="/">
          <a className="cursor-pointer text-btnText p-3 bg-button rounded-2xl shadow-xl">
            Go back to main page
          </a>
        </Link>
      </div>
    </>
  );
};

export default custom404;
