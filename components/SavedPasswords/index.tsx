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
    <div className="relative">
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
                  <div className="absolute h-screen w-screen bg-gray-900 bg-opacity-10 z-0 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                    <div className="rounded-xl fixed border-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 bg-primary text-lg">
                      <div className="mb-4 text-2xl">Are you sure?</div>
                      <span
                        className="cursor-pointer absolute top-9 right-4"
                        onClick={() => setConfirmWindow((prev) => !prev)}
                      >
                        <AiOutlineClose size={20} />
                      </span>
                      <button
                        className="w-full my-2 p-3  bg-button text-btnText rounded-2xl shadow-xl cursor-pointer mb-4"
                        onClick={() => setConfirmWindow((prev) => !prev)}
                      >
                        Actually, no
                      </button>
                      <button
                        className="w-full my-2 p-3 bg-primary  rounded-2xl shadow-xl cursor-pointer border text-primary"
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
