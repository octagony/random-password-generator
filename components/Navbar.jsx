import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { IconContext } from "react-icons";
import  ThemeToggle from "./ThemeToggle";

/*
 * TODO:
 * 1. Setup Links Components
 * 2. Create routers for account page
 * 3. Setup a dynamic buttons for account and logout
 */

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const { user, logout } = useAuth();
  const router = useRouter();

  const handleMenu = () => {
    setNav((prev) => !prev);
  };

  return (
    <div className = 'rounded flex items-center justify-between h-20 font-bold px-2'>
      <Link href="/">
        <h1 className = 'text-2xl'>Easy/Pass</h1>
      </Link>
	  <div className = 'hidden md:block'>
		<ThemeToggle />
	  </div>
	  <div className = 'hidden md:block'>
			<Link href = "/signin"> 
				<a className = 'p-4 hover:text-accent'> Sign In</a>
	    	</Link>	
			<Link href = "/signin"> 
				<a className = 'bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl'>Sign In</a>
	    	</Link>	
	  </div>
	  {/* Menu */}
	  <div className = 'block md:hidden cursor-pointer z-10' onClick = {handleMenu}>
		{nav ? <AiOutlineClose size={25}/> : <AiOutlineMenu size={25}/> }
	  </div>
	  
	  {/*Mobile Menu */}
	  <div className = {nav ? 'md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] bg-primary ease-in duration-300 z-10': 'fixed left-[-100%] top-20 h-[90%] flex flex-col items-center justify-between ease-in duration-300'}>
		<ul className = 'w-full p-4 '>
			<li className = 'border-b py-6'> <Link href = '/'> Home </Link> </li>
			<li className = 'border-b py-6'> <Link href = '/'>Account</Link> </li>
			<li className = 'border-b py-6'> <ThemeToggle /> </li>
		</ul>
	  <div className = 'flex flex-col w-full p-4'>
		<Link href = '/signin'> 
			<button className = 'w-full my-2 p-3 bg-primary text-primary border-secondary rounded-2xl shadow-xl'> Sign In </button>
		</Link > 
		<Link href = '/signup'> 
			<button className = 'w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl'> Sign Up </button>
		</Link > 
	  </div>
	  </div>
    </div>
  );
};

export default Navbar;
