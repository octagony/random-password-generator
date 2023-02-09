import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IModal } from "./Modal.props";
import styles from './Modal.module.css'

const Modal = ({
  savePassword,
  password,
  setModalSave,
  setPassword,
}: IModal): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <div className={styles.inner}>
          <div className={styles.inner__name}>
            <p className={styles.inner__title}> Save your password</p>
            <span
              className={styles.inner__close}
              onClick={() => setModalSave(false)}
            >
              <AiOutlineClose size={20} />
            </span>
          </div>
          <form onSubmit={savePassword}>
            <div className={styles.inner__wrapper}>
              <label
                className={styles.inner__label}
                htmlFor="password-name"
              >
                Password name:
              </label>
              <input
                className={styles.inner__input}
                id="password-name"
                type="text"
                placeholder="my awesome password"
                onChange={(event) =>
                  setPassword({ ...password, name: event.target.value })
                }
                value={password.name}
              />
            </div>
            <div className={styles.inner__wrapper}>
              <label
                className={styles.inner__label}
                htmlFor="password-name"
              >
                Configure password:
              </label>
              <input
                className={styles.inner__input}
                id="password-name"
                type="text"
                onChange={(event) =>
                  setPassword({ ...password, value: event.target.value })
                }
                value={password.value}
              />
            </div>
            <div className={styles.inner__save}>
              <input
                className={styles.inner__btn}
                type="submit"
                value="Save password"
              ></input>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
