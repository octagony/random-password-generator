import React from "react";
import Link from "next/link";
import { VscAccount } from "react-icons/vsc";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

const Navbar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  return (
    <div className="w-full shadow-xl">
      <div className="flex justify-between w-full items-center px-2 py-4 2xl:px-16">
        <Link href="/">
          <h1 className="cursor-pointer">Easy/Pass</h1>
        </Link>
        <nav>
          <ul className="flex gap-5">
            {user ? (
              <li>
                <button
                  className="p-2"
                  onClick={() => {
                    logout();
                    router.push("/signin");
                  }}
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link href="/signin">
                    <button className="p-2">Sign In</button>
                  </Link>
                </li>
                <li>
                  <Link href="/signup">
                    <button className="p-2">Sign Up</button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
