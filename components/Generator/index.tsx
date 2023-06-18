import React, { SyntheticEvent, useState } from "react";
import Checkbox from "../UI/Checkbox/";
import { IGenerator } from "./Generator.props";
import Range from "../UI/Range";
import styles from "./Generator.module.css";

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
      className={styles.form}
    >
      <div>
        {password.value ? (
          <span className={styles.password__value}>Your password: </span>
        ) : (
          <span className={styles.password__value}>
            {" "}
            Select the password length:{" "}
          </span>
        )}
        <span
          className={firstAttempt ? `${styles.hide}` : `${styles.password}`}
        >
          {password.value}
        </span>
        {actionButtons ? (
          <div className={styles.action__buttons}>
            <button
              className={styles.action__button}
              onClick={(event: SyntheticEvent) =>
                handleCopyToClipboard(event, password.value)
              }
            >
              Copy to Clipboard
            </button>
            <button
              className={styles.action__button}
              onClick={() => setModalSave(true)}
            >
              Save Password
            </button>
          </div>
        ) : null}
      </div>
      <div className={styles.range}>
        <Range
          passwordLength={passwordLength}
          handlePasswordLength={handlePasswordLength}
        />
        <span className="mt-2">Password Length:</span>
        <span>{passwordLength}</span>
      </div>
      <div className={styles.grid__checkboxes}>
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
          className={styles.generate__button}
          type="submit"
          value="Generate password"
        />
      </div>
    </form>
  );
};

export default Generator;
