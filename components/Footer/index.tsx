import { AiFillGithub } from "react-icons/ai";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <a
        className={styles.link}
        href="https://github.com/octagony"
        target="_blank"
        rel="noreferrer"
      >
        <AiFillGithub className={styles.icon} size={40} />
      </a>
      <p className={styles.about}>Octagony / {new Date().getFullYear()}</p>
    </div>
  );
};

export default Footer;
