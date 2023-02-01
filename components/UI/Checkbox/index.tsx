import React from "react";
import { ICheckbox } from "./Checkbox.props";

const Checkbox = ({ updateCheckboxes, name, children }: ICheckbox) => {
  return (
    <label className="flex radio p-2 cursor-pointer">
      <input
        className="my-auto transform scale-125"
        name={name}
        type="checkbox"
        onChange={() => {
          updateCheckboxes(event);
        }}
      />
      <div className="title px-2 my-auto">{children}</div>
    </label>
  );
};
export default Checkbox;
