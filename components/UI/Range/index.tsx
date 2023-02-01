import React from "react";
import { IRange } from "./Range.props";

const Range = ({ passwordLength, handlePasswordLength }: IRange) => {
  return (
    <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">
      <input
        type="range"
        name="length"
        onChange={() => {
          handlePasswordLength(event);
        }}
        min="10"
        max="80"
        value={passwordLength}
        className="mb-2 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
    </label>
  );
};

export default Range;
