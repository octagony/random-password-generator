import { AiFillGithub } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="w-full text-center mt-2 rounded-3xl py-2">
      <a
        className="inline-block"
        href="https://github.com/octagony"
        target="_blank"
        rel="noreferrer"
      >
        <AiFillGithub className="mx-auto" size={40} />
      </a>
      <p className="text-primary font-bold">
        Octagony / {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default Footer;
