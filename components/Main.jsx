import React, { useState } from "react";
import { v4 as generateId } from "uuid";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebase.config";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import Generator from "./Generator.jsx";
import Modal from "./Modal.jsx";
import Popup from "./UI/Popup";
const generator = require("generate-password");

/*
 TODO:
 1. Setup dynamic popup 
*/

const Main = () => {
  const [password, setPassword] = useState({
    id: "",
    name: " ",
    value: initialState,
  });

  const [passwordLength, setPasswordLength] = useState(10);

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

  const [popupStatus, setPopupStatus] = useState(false);

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
      setPopupStatus(true)
      setTimeout(()=>{
        setPopupStatus(false)
      },3000)
      setModalSave(false)
    } else {
      alert("Please sign in to save password!");
    }
  };

  const updateCheckboxes = (event) => {
    setInitialState({
      ...initialState,
      [event.target.name]: event.target.checked,
    });
  };

  const handlePasswordLength = (event) => {
    setPasswordLength(event.target.value);
    setInitialState({
      ...initialState,
      [event.target.name]: event.target.value,
    });
  };

  const handleGeneratePassword = (event) => {
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
      <h1 className="text-xl mb-2 ">Let&apos;s create a password for you!</h1>
      <div>
        <Generator
          handleGeneratePassword={handleGeneratePassword}
          password={password}
          actionButtons={actionButtons}
          handlePasswordLength={handlePasswordLength}
          passwordLength={passwordLength}
          updateCheckboxes={updateCheckboxes}
          handleCopyToClipboard={handleCopyToClipboard}
          setModalSave={setModalSave}
        />
      </div>
      {modalSave ? (
        <Modal
          savePassword={savePassword}
          password={password}
          setModalSave={setModalSave}
          setPassword={setPassword}
        />
      ) : null}
      {popupStatus && <Popup text='random text' status={'success'}/>}
    </div>
  );
};

export default Main;
