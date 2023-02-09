import React, { SyntheticEvent, useState } from "react";
import { v4 as generateId } from "uuid";
import { generate } from "generate-password";
import { IState, IPassword } from "../../types/state";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../config/firebase.config";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import Layout from "../Layout";
import Generator from "../Generator";
import Modal from "../Modal";
import AlertBox from "../AlertBox";

const Main = () => {
  const [initialState, setInitialState] = useState<IState>({
    length: 10,
    numbers: false,
    symbols: false,
    lowercase: true,
    uppercase: false,
  });

  const [password, setPassword] = useState<IPassword>({
    id: "",
    name: "",
    value: "",
  });

  const [passwordLength, setPasswordLength] = useState<number>(10);
  const [actionButtons, setActionButtons] = useState<boolean>(false);
  const [modalSave, setModalSave] = useState<boolean>(false);
  const [, setSavedPasswords] = useState<boolean>(false);
  const [alertStatus, setAlertStatus] = useState({
    status: "",
    show: false,
    msg: "",
  });
  const { user } = useAuth();
  const passwordsPath = doc(db, "users", `${user?.email}`);

  const savePassword = async (event: SyntheticEvent) => {
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
      setAlertStatus({
        status: "success",
        show: true,
        msg: "Password Saved!",
      });
      setModalSave(false);
    } else {
      setAlertStatus({
        status: "error",
        show: true,
        msg: "Please sign in to save password!",
      });
    }
  };

  const updateCheckboxes = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setInitialState({
      ...initialState,
      [target.name]: target.checked,
    });
  };

  const handlePasswordLength = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setPasswordLength(parseInt(target.value));
    setInitialState({
      ...initialState,
      [target.name]: target.value,
    });
  };

  const handleGeneratePassword = () => {
    setActionButtons(true);
    setInitialState({
      ...initialState,
      length: initialState.length,
    });

    const getPassword = generate(initialState);

    setPassword({
      ...password,
      value: getPassword,
    });
  };

  const handleCopyToClipboard = async (event: SyntheticEvent) => {
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
      <AlertBox
        alertStatus={alertStatus}
        setAlertStatus={setAlertStatus}
      ></AlertBox>
    </Layout>
  );
};

export default Main;
