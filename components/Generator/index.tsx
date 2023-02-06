import React, { SyntheticEvent, useState } from "react";
import Checkbox from "../UI/Checkbox/";
import { IGenerator } from "./Generator.props";
import Range from "../UI/Range";

const Generator = ({
  handleGeneratePassword,
  password,
  actionButtons,
  handlePasswordLength,
  passwordLength,
  updateCheckboxes,
  handleCopyToClipboard,
  setModalSave,
}: IGenerator) => {
  const [firstAttempt, setFirstAttempt] = useState(true);

  const handleFirstGenerate = (event: SyntheticEvent) => {
    event.preventDefault();
    setFirstAttempt(!firstAttempt ? firstAttempt : !firstAttempt);
    handleGeneratePassword();
  };

  return (
    <form
      onSubmit={(event) => handleFirstGenerate(event)}
      className="p-4 rounded-xl"
    >
      <div>
        {password.value ? (
          <span className="text-primary text-lg block mb-2">
            Your password:{" "}
          </span>
        ) : (
          <span className="text-primary text-lg block mb-2">
            {" "}
            Select the password length:{" "}
          </span>
        )}
        <span
          className={
            firstAttempt
              ? "hidden"
              : "p-4 border-2 mb-4 rounded-xl text-xl font-mono overflow-x-auto overflow-y-hidden w-[280px] md:w-[500px] lg:w-[760px] xl:w-full mx-auto block"
          }
        >
          {password.value}
        </span>
        {actionButtons ? (
          <div className="flex flex-col md:flex-row md:justify-evenly mb-5">
            <button
              className="w-full md:w-1/2 my-2 md:mx-2  p-3 bg-button text-btnText rounded-2xl shadow-xl"
              onClick={handleCopyToClipboard}
            >
              Copy to Clipboard
            </button>
            <button
              className="w-full md:w-1/2 my-2 md:mx-2 p-3 bg-button text-btnText rounded-2xl shadow-xl"
              onClick={() => setModalSave(true)}
            >
              Save Password
            </button>
          </div>
        ) : null}
      </div>
      <div className="p-6">
        <Range
          passwordLength={passwordLength}
          handlePasswordLength={handlePasswordLength}
        />
        <span className="mt-2">Password Length:</span>
        <span>{passwordLength}</span>
      </div>
      <div className="grid grid-cols-1 place-items-center md:grid-cols-3">
        <Checkbox updateCheckboxes={updateCheckboxes} name="numbers">
          Include numbers
        </Checkbox>
        <Checkbox updateCheckboxes={updateCheckboxes} name="symbols">
          Include symbols
        </Checkbox>
        <Checkbox updateCheckboxes={updateCheckboxes} name="uppercase">
          Include uppercase
        </Checkbox>
      </div>
      <div>
        <input
          className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl"
          type="submit"
          value="Generate password"
        />
      </div>
    </form>
  );
};

export default Generator;
