import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

const SavedPasswords = () => {
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    setPasswords([
      {
        id: 123,
        name: "Bitwarden",
        value: "asdasd",
      },
    ]);
  }, []);
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
              <tr key={password.id} className='h-[60px] overflow-hidden'>
                <td>{password?.name}</td>
                <td>{password?.value}</td>
                <td >
                  <AiOutlineClose className="cursor-pointer mx-auto" />
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
