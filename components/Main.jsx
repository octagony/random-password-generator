import React, { useState, useEffect } from "react";
const generator = require("generate-password");

const Main = () => {
  const [password, setPassword] = useState("");

  const [passwordLength, setPasswordLength] = useState(2);

  const [initialState, setInitialState] = useState({
    length: 10,
    numbers: false,
    symbols: false,
    lowercase: true,
    uppercase: false,
  });

  const handlePasswordLenght = (event) => {
    setPasswordLength(event.target.value);
    setInitialState({
      ...initialState,
      [event.target.name]: event.target.value,
    });
  };

  const updateCheckboxes = (event) => {
    setInitialState({
      ...initialState,
      [event.target.name]: event.target.checked,
    });
  };

  const handleGeneratePassword = (event) => {
    event.preventDefault();
    setInitialState({
      ...initialState,
      length: parseInt(initialState.length),
    });

    const password = generator.generate(initialState);
    setPassword(password);
  };

  const handleCopyToClipboard = (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(password);
  };

  return (
    <div className="text-center">
      <h2>Let&apos;s create a password for you!</h2>
      <div>
        <form
          onSubmit={handleGeneratePassword}
          className="p-4 border-2 border-amber-400"
        >
          <div>
            <span>Your password: </span>
            <p>{password}</p>
            <button
              className="p-2 cursor-pointer"
              onClick={handleCopyToClipboard}
            >
              Copy to Clipboard
            </button>
          </div>
          <div>
            <span>Password Length:</span>
            <input
              type="range"
              name="length"
              onChange={handlePasswordLenght}
              min="2"
              max="100"
              value={passwordLength}
            />
            <span>{passwordLength}</span>
          </div>
          <div>
            <span>Include numbers:</span>
            <input type="checkbox" name="numbers" onChange={updateCheckboxes} />
          </div>
          <div>
            <span>Include symbols:</span>
            <input type="checkbox" name="symbols" onChange={updateCheckboxes} />
          </div>
          <div>
            <span>Include uppercase:</span>
            <input
              type="checkbox"
              name="uppercase"
              onChange={updateCheckboxes}
            />
          </div>
          <div>
            <input
              className="p-2 bg-slate-500 cursor-pointer"
              type="submit"
              value="Generate password"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Main;
