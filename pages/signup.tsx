import React, { SyntheticEvent, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Loader from "../components/UI/Loader";
import { AiOutlineMail, AiFillLock } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

const Signup = () => {
  const router = useRouter();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSignUp = async (event: SyntheticEvent) => {
    event.preventDefault();
    setLoader((prev) => !prev);
    try {
      await signup(data.email, data.password);
      await router.push("/");
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    } finally {
      setLoader((prev) => !prev);
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <div>
        <div className="max-w-[400px] mx-auto min-h-[600px] px-4 py-20">
          {loader && <Loader />}
          <h1 className="text-3xl font-bold">Sign Up</h1>
          {error ? <p className="bg-red-300 p-3 my-2">{error}</p> : null}
          <form onSubmit={handleSignUp}>
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
              Sign Up
            </button>
          </form>
          <p className="my-4">
            Already have an account?{" "}
            <Link href="/signin">
              <span className="text-indigo-600 cursor-pointer">Sign In</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
