import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { useAuth } from "../context/AuthContext";

const SavedPasswords = () => {
  const [passwords, setPasswords] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setPasswords(doc.data()?.watchList);
    });
  }, [user?.email]);

  const passwordsPath = doc(db, "users", `${user?.email}`);
  const deletePassword = async (passedId) => {
    const confirm = window.confirm('You Sure?');
    if(confirm){
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
        <div className="grid place-items-center w-full">
          <div>
            {passwords?.map((password) => (
              <div key={password.id}>
                <div className='flex justify-between items-center my-6 px-2 text-accent'>
                <div className='text-xl font-bold'>{password?.name}</div>
                <div>
                  <AiOutlineClose
                    className="cursor-pointer mx-auto"
                    onClick={() => deletePassword(password.id)}
                    size={20}
                  />
                </div>
                </div>
                <div className='text-sm w-[300px] sm:w-[400px] md:w-full overflow-x-scroll whitespace-nowrap border-2 rounded-xl py-4 px-2'>{password?.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedPasswords;
