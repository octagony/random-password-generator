import React, { useState } from "react";
import { useRouter } from "next/router";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import ThemeToggle from "../ThemeToggle";
import { useAuth } from "../../context/AuthContext";
import style from "./Navbar.module.css";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { user, logout } = useAuth();

  const router = useRouter();

  const handleMenu = () => {
    setNav((prev) => !prev);
  };

  const handleNavigate = async (route: string) => {
    try {
      router.push(`${route}`);
      setNav(false);
    } catch (e) {
      console.error("Error: ${e.message}");
    }
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
    <div className={style.wrapper}>
      <h1 className={style.logo} onClick={() => handleNavigate("/")}>
        Easy/Pass
      </h1>
      <div className={style.theme}>
        <ThemeToggle />
      </div>
      {user?.email ? (
        <div className={style.email__wrapper}>
          <a
            className={style.email__button}
            onClick={() => handleNavigate("/account")}
          >
            Account
          </a>
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      ) : (
        <div className={style.account__wrapper}>
          <a
            className={style.signin__button}
            onClick={() => handleNavigate("/signin")}
          >
            {" "}
            Sign In
          </a>
          <a
            className={style.signup__button}
            onClick={() => handleNavigate("/signup")}
          >
            Sign Up
          </a>
        </div>
      )}

      {/* Menu */}
      <div className={style.menu__button} onClick={handleMenu}>
        {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
      </div>

      {/*Mobile Menu */}
      <div className={nav ? `${style.menu__hidden}` : `${style.menu__open}`}>
        <ul className={style.menu__wrapper}>
          <li className={style.main__btns} onClick={() => handleNavigate("/")}>
            Home
          </li>
          {user?.email ? (
            <li
              className={style.main__btns}
              onClick={() => handleNavigate("/account")}
            >
              Account
            </li>
          ) : null}
          <li className={style.main__btns}>
            <ThemeToggle />
          </li>
        </ul>
        <div className={style.account__btns}>
          {user?.email ? (
            <>
              <button
                className={style.account__sign_in}
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button
                className={style.account__sign_out}
                onClick={() => handleNavigate("/signin")}
              >
                Sign In
              </button>
              <button
                className={style.account__sign_up}
                onClick={() => handleNavigate("/signup")}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
