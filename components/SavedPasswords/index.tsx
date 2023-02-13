import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../config/firebase.config";
import { IPassword } from "../../types/state";
import style from "./SavedPasswords.module.css";

const SavedPasswords = () => {
  const [passwords, setPasswords] = useState<IPassword[]>([]);
  const [confirmWindow, setConfirmWindow] = useState<boolean>(false);
  const { user } = useAuth();

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setPasswords(doc.data()?.watchList);
    });
  }, [user?.email]);

  const passwordsPath = doc(db, "users", `${user?.email}`);

  const deletePassword = async (passedId: string) => {
    if (confirm) {
      try {
        const result = passwords.filter((password) => {
          return password.id !== passedId;
        });
        await updateDoc(passwordsPath, {
          watchList: result,
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className={style.wrapper}>
      {!passwords?.length ? (
        <p>You don&apos;t have any passwords saved.</p>
      ) : (
        <div className={style.password__wrapper}>
          <div>
            {passwords?.map((password) => (
              <div key={password.id}>
                <div className={style.password}>
                  <div className={style.password__name}>{password?.name}</div>
                  <div>
                    <AiOutlineClose
                      className={style.icon}
                      onClick={() => setConfirmWindow((prev) => !prev)}
                      size={20}
                    />
                  </div>
                </div>
                <div className={style.password__value}>{password?.value}</div>
                {confirmWindow && (
                  <div className={style.confirm__window}>
                    <div className={style.confir__inner}>
                      <div className={style.confir__title}>Are you sure?</div>
                      <span
                        className={style.confirm__close}
                        onClick={() => setConfirmWindow((prev) => !prev)}
                      >
                        <AiOutlineClose size={20} />
                      </span>
                      <button
                        className={style.confirm__negative}
                        onClick={() => setConfirmWindow((prev) => !prev)}
                      >
                        Actually, no
                      </button>
                      <button
                        className={style.confirm__positive}
                        onClick={() => deletePassword(password.id)}
                      >
                        Yes, i want that
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedPasswords;
