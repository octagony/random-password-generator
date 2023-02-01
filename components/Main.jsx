import React, { useState } from "react";
import { v4 as generateId } from "uuid";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebase.config";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import Generator from "./Generator";
import Modal from "./Modal.jsx";
import Layout from "./Layout";
import { generate } from "generate-password";

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
      alert("Passsword saved!");
      setModalSave(false);
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

  const handleGeneratePassword = () => {
    setActionButtons(true);
    setInitialState({
      ...initialState,
      length: parseInt(initialState.length),
    });

    const getPassword = generate(initialState);
    setPassword({
      ...password,
      value: getPassword,
    });
  };

  const handleCopyToClipboard = async (event) => {
    event.preventDefault();
    try {
      await navigator.clipboard.writeText(password.value);
      alert("Password copied to clipboard!");
    } catch (e) {
      console.error(e.name, e.message);
      alert("Password not copied!");
    }
  };

  return (
    <Layout>
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
      {modalSave ? (
        <Modal
          savePassword={savePassword}
          password={password}
          setModalSave={setModalSave}
          setPassword={setPassword}
        />
      ) : null}
    </Layout>
  );
};

export default Main;
