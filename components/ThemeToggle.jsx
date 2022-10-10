import React from 'react'
import {HiSun, HiMoon} from "react-icons/hi";
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggle = () => {
	const [theme, setTheme]  = useContext(ThemeContext);	
  return (
	{theme === 'dark' ? (
		<div>
		<HiSun/> Light Mode
		</div>
	): <div>
		<HiMoon/> Dark Mode	
	</div> }
  )
}


export default ThemeToggle
