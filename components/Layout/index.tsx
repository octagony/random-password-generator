import Logo from "../UI/Logo";
import { ILayout } from "./Layout.props";
import styles from "./Layout.module.css";

const Layout = ({ children }: ILayout) => {
  return (
    <div className={styles.layout}>
      <Logo />
      {children}
    </div>
  );
};

export default Layout;
