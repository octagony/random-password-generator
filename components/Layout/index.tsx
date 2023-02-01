import Logo from "../UI/Logo";
import { ILayout } from "./Layout.props";

const Layout = ({ children }: ILayout) => {
  return (
    <div className="rounded grid text-center my-5 font-bold">
      <Logo />
      {children}
    </div>
  );
};

export default Layout;
