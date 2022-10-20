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
  };

  return (
    <div>
      {!passwords.length ? (
        <p>You don&apos;t have any passwords saved.</p>
      ) : (
        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="border-b">
              <td className="px-4">Name</td>
              <td>Password</td>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody>
            {passwords.map((password) => (
              <tr key={password.id} className="h-[60px] overflow-hidden">
                <td>{password?.name}</td>
                <td>{password?.value}</td>
                <td>
                  <AiOutlineClose
                    className="cursor-pointer mx-auto"
                    onClick={() => deletePassword(password.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedPasswords;
