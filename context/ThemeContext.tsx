import React, { useState, useEffect, createContext } from "react";

type ThemeContextType = "light" | "dark";

const getInitialTheme = (): ThemeContextType => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("color-theme");
    if (!storedPrefs) {
      return "light";
    }

    const userMedia = window.matchMedia("(prefers-color-scheme:dark)");
    if (userMedia.matches) return "dark";
  }
  return "light";
};

export const ThemeContext = createContext<ThemeContextType>("light");

export const ThemeProvider = ({ initialTheme, children }) => {
  const [theme, setTheme] = useState<ThemeContextType>(getInitialTheme);

  const rawSetTheme = (theme: ThemeContextType) => {
    const root = window.document.documentElement;

    root.classList.remove(theme === "dark" ? "light" : "dark");
    root.classList.add(theme);

    localStorage.setItem("color-theme", theme);
  };

  if (initialTheme) {
    rawSetTheme(initialTheme);
  }

  useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
