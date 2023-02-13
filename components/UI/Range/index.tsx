import React from "react";
import { IRange } from "./Range.props";
import style from "./Range.module.css";

const Range = ({ passwordLength, handlePasswordLength }: IRange) => {
  return (
    <label className={style.wrapper}>
      <input
        type="range"
        name="length"
        onChange={() => {
          handlePasswordLength(event);
        }}
        min="10"
        max="80"
        value={passwordLength}
        className={style.input}
      />
    </label>
  );
};

export default Range;
