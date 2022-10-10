import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { IconContext } from "react-icons";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const { user, logout } = useAuth();
  const router = useRouter();

  const handleMenu = () => {
    setNav((prev) => !prev);
    console.log(nav);
  };

  return (
    <div>
      <Link href="/">
        <h1>Easy/Pass</h1>
      </Link>
	  
    </div>
  );
};

export default Navbar;
