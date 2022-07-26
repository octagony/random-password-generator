import React from "react";
import Link from 'next/link'
import { VscAccount } from "react-icons/vsc";

const Navbar = () => {
  return (
    <div className="w-full shadow-xl">
      <div className="flex justify-between w-full items-center px-2 py-4 2xl:px-16">
        <Link href='/'>
          <h1 className="cursor-pointer">Easy/Pass</h1>
        </Link>
        <nav>
          <ul className="flex gap-5">
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
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
