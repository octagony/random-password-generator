import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import ThemeToggle from "./ThemeToggle";



const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const handleMenu = () => {
    setNav((prev) => !prev);
  };

  const handleSignOut = async () => {
    try {
      await logout();
      router.push("/signin");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="rounded flex items-center justify-between px-4 mt-4 h-20 font-bold">
      <Link href="/">
        <h1 className="cursor-pointer text-3xl">Easy/Pass</h1>
      </Link>
      <div className="hidden md:block">
        <ThemeToggle />
      </div>
      {user?.email ? (
        <div className="hidden  md:flex gap-1">
          <Link href="/account">
            <a className="p-4 bg-button rounded-2xl text-btnText px-5 py-2 inline-block mr-2 hover:scale-105 transition-all">
              Account
            </a>
          </Link>
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      ) : (
        <div className="hidden md:block">
          <Link href="/signin">
            <a className="p-4 hover:text-accent"> Sign In</a>
          </Link>
          <Link href="/signup">
            <a className="bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl">
              Sign Up
            </a>
          </Link>
        </div>
      )}

      {/* Menu */}
      <div className="block md:hidden cursor-pointer z-10" onClick={handleMenu}>
        {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
      </div>

      {/*Mobile Menu */}
      <div
        className={
          nav
            ? "md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] bg-primary ease-in duration-300 z-10"
            : "fixed left-[-100%] top-20 h-[90%] flex flex-col items-center justify-between ease-in duration-300"
        }
      >
        <ul className="w-full p-4 ">
          <li className="border-b py-6">
            <Link href="/"> Home </Link>
          </li>
          {user?.email ? (
            <li className="border-b py-6">
              <Link href="/account">Account</Link>
            </li>
          ) : null}
          <li className="border-b py-6">
            <ThemeToggle />
          </li>
        </ul>
        <div className="flex flex-col w-full p-4">
          {user?.email ? (
            <>
              <button
                className="w-full my-3 p-3 bg-button text-btnText rounded-2xl shadow-xl"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/signin">
                <button className="w-full my-2 p-3 bg-primary text-primary border-secondary rounded-2xl shadow-xl">
                  Sign In
                </button>
              </Link>
              <Link href="/signup">
                <button className="w-full my-3 p-3 bg-button text-btnText rounded-2xl shadow-xl">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
