import style from "./Loader.module.css";
const Loader = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.loader}></div>
    </div>
  );
};

export default Loader;
