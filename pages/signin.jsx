import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineMail, AiFillLock } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import Head from "next/head";

const Signin = () => {
  const router = useRouter();

  const { login } = useAuth();

  const [error, setError] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const displayError = (errorMessage)=> {
    return errorMessage.includes('password') ? 'Sorry, wrong password' : 'Something wrong with your e-mail'
}

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await login(data.email, data.password);
      router.push("/account");
    } catch (error) {
      const errorMessage = displayError(error.message);
      setError(errorMessage);
    }
  };

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <div>
        <div className="max-w-[400px] mx-auto min-h-[600px] px-4 py-20">
          <h1 className="text-3xl font-bold">Sign In</h1>
          {error ? (
            <p className="bg-primary border rounded-lg border-red-700 text-primary p-3 my-2">
              {error}
            </p>
          ) : null}
          <form onSubmit={handleLogin}>
            <div className="my-4">
              <label>Email</label>
              <div className="my-2 w-full relative rounded-2xl shadow-xl">
                <input
                  className="w-full p-2 bg-transparent border border-lime-100 rounded-2xl"
                  type="email"
                  onChange={(event) =>
                    setData({ ...data, email: event.target.value })
                  }
                />
                <AiOutlineMail className="absolute right-2 top-3 text-gray-400" />
              </div>
            </div>
            <div className="my-4">
              <label>Password</label>
              <div className="my-2 w-full relative rounded-2xl shadow-xl">
                <input
                  className="w-full p-2 bg-transparent border border-lime-100 rounded-2xl"
                  type="password"
                  onChange={(event) =>
                    setData({ ...data, password: event.target.value })
                  }
                />
                <AiFillLock className="absolute right-2 top-3 text-gray-400" />
              </div>
            </div>
            <button className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl">
              Sign In
            </button>
          </form>
          <p className="my-4">
            Don&apos;t have an account?{" "}
            <Link href="/signup">
              <span className="text-indigo-600 cursor-pointer">Sign Up</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signin;
