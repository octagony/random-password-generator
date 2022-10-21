import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContextProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <ThemeProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
