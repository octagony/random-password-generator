import React, { useContext } from "react";
import { HiSun, HiMoon } from "react-icons/hi";
import { ThemeContext } from "../../context/ThemeContext";
import style from "./ThemeToggle.module.css";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div className={style.wrapper}>
      {theme === "dark" ? (
        <div
          className={style.icon__wrapper}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <HiSun className={style.icon} /> Light Mode
        </div>
      ) : (
        <div
          className={style.icon__wrapper}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <HiMoon className={style.icon} /> Dark Mode
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
