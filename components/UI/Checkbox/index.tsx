import React, { SyntheticEvent } from "react";
import { ICheckbox } from "./Checkbox.props";
import style from "./Checkbox.module.css";

const Checkbox = ({ updateCheckboxes, name, children }: ICheckbox) => {
  return (
    <label className={style.label}>
      <input
        className={style.input}
        name={name}
        type="checkbox"
        onChange={(event: SyntheticEvent) => {
          updateCheckboxes(event);
        }}
      />
      <div className={style.text}>{children}</div>
    </label>
  );
};
export default Checkbox;
