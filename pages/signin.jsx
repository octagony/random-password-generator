import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineMail, AiFillLock } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

const Signin = () => {
  const router = useRouter();
  const { user, login } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await login(data.email, data.password);
      router.push("/account");
    } catch (error) {
      console.log(error.message);
    }

    console.log(data);
  };

  return (
    <div>
      <div className="max-w-[400px] mx-auto min-h-[600px] px-4 py-20">
        <h1 className="text-3xl font-bold">Sign In</h1>
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
          <button className="w-full my-2 p-3 bg-slate-600">Sign In</button>
        </form>
        <p className="my-4">
          Don&apos;t have an account?{" "}
          <Link href="/signup">
            <span className="text-indigo-600 cursor-pointer">Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
