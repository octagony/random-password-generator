import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../config/firebase.config";
import { IPassword } from "../../types/state";
import style from "./SavedPasswords.module.css";

const SavedPasswords = () => {
  const [passwords, setPasswords] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setPasswords(doc.data()?.watchList);
    });
  }, [user?.email]);

  const passwordsPath = doc(db, "users", `${user?.email}`);
  const deletePassword = async (passedId: Pick<IPassword, "id">) => {
    const confirm = window.confirm("You Sure?");
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
    <div>
      {!passwords?.length ? (
        <p>You don&apos;t have any passwords saved.</p>
      ) : (
        <div className={style.wrapper}>
          <div>
            {passwords?.map((password) => (
              <div key={password.id}>
                <div className={style.password}>
                  <div className={style.password__name}>{password?.name}</div>
                  <div>
                    <AiOutlineClose
                      className={style.icon}
                      onClick={() => deletePassword(password.id)}
                      size={20}
                    />
                  </div>
                </div>
                <div className={style.password__value}>{password?.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedPasswords;
