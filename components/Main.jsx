import React, { useState } from "react";
import { v4 as generateId } from "uuid";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import Generator from "./Generator.jsx"
import Modal from "./Modal.jsx"
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
    <div className="rounded grid text-center my-5 font-bold">
      <h2>Let&apos;s create a password for you!</h2>
      <div>
      <Generator initialStatei={initialState} setInitialState={setInitialState} handleGeneratePassword={handleGeneratePassword} password={password} actionButtons={actionButtons} handlePasswordLenght = {handlePasswordLenght} passwordLength = {passwordLength} handleCopyToClipboard = {handleCopyToClipboard} setModalSave = {setModalSave}/>
      </div>
      {modalSave ? (
        <Modal savePassword={savePassword} password={password} setModalSave={setModalSave}/>
      ) : null}
    </div>
  );
};

export default Main;
