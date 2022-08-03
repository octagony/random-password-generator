import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { v4 as generateId } from "uuid";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
const generator = require("generate-password");

const Main = () => {
  const [password, setPassword] = useState({
    id: "",
    name: " ",
    value: initialState,
  });

  const [passwordLength, setPasswordLength] = useState(2);
  const [actionButtons, setActionButtons] = useState(false);
  const [modalSave, setModalSave] = useState(false);

  const [initialState, setInitialState] = useState({
    length: 10,
    numbers: false,
    symbols: false,
    lowercase: true,
    uppercase: false,
  });

  const [savedPasswords, setSavedPasswords] = useState(false);
  const { user } = useAuth();

  const passwordsPath = doc(db, "users", `${user?.email}`);

  const savePassword = async (event) => {
    event.preventDefault();
    if (user?.email) {
      setSavedPasswords(true);
      await updateDoc(passwordsPath, {
        watchList: arrayUnion({
          id: generateId(),
          name: password.name,
          value: password.value,
        }),
      });
    } else {
      alert("Please sign in to save password!");
    }
  };

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
    setActionButtons(true);
    setInitialState({
      ...initialState,
      length: parseInt(initialState.length),
    });

    const getPassword = generator.generate(initialState);
    setPassword({
      ...password,
      value: getPassword,
    });
  };

  const handleCopyToClipboard = (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(password.value);
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
            <p>{password.value}</p>
            {actionButtons ? (
              <div>
                <button
                  className="p-2 cursor-pointer"
                  onClick={handleCopyToClipboard}
                >
                  Copy to Clipboard
                </button>
                <button
                  className="p-2 cursor-pointer"
                  onClick={() => setModalSave(true)}
                >
                  Save Password
                </button>
              </div>
            ) : null}
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
      {modalSave ? (
        <div className="absolute w-screen h-screen bg-gray-900 bg-opacity-20 z-0 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-96 h-96 p-2 bg-white rounded-xl">
              <div className="">
                <p>Save your password</p>
                <span
                  className="cursor-pointer absolute top-2 right-2"
                  onClick={() => setModalSave(false)}
                >
                  <AiOutlineClose size={20} />
                </span>
              </div>
              <form onSubmit={savePassword}>
                <div>
                  <p>Set label</p>
                  <input
                    type="text"
                    onChange={(event) =>
                      setPassword({ ...password, name: event.target.value })
                    }
                    value={password.name}
                  />
                </div>
                <div>
                  <p>Configure password</p>
                  <input
                    type="text"
                    onChange={(event) =>
                      setPassword({ ...password, value: event.target.value })
                    }
                    value={password.value}
                  />
                </div>
                <input
                  className="p-4 border border-cyan-900 cursor-pointer"
                  type="submit"
                  value="Save password"
                ></input>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Main;
