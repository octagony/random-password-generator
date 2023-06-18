import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import SavedPasswords from "../components/SavedPasswords";
import Head from "next/head";
import Loader from "../components/UI/Loader";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { IPassword } from "../types/state";

const Account = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [savedPasswords, setSavedPasswords] = useState<IPassword[]>([]);

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
      setSavedPasswords(doc.data()?.watchList);
    });
  }, [user]);

  console.log(savedPasswords);

  const downloadPasswords = () =>{
    const passwords = savedPasswords.map(item=>(
      `${item.name} : ${item.value}\n`
    )).join('')
    
 
    const link = document.createElement('a');
    link.setAttribute('href','data:text/plain; charset=utf-8,' + encodeURIComponent(passwords))
    link.setAttribute('download', 'Easy_Pass.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleSignOut = async () => {
    setLoader((prev) => !prev);
    try {
      await logout();
      router.push("/signin");
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoader((prev) => !prev);
    }
  };

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  }, [router, user]);

  return (
    <>
      <Head>
        <title>Account</title>
      </Head>
      <div className="max-w-[1240px] mx-auto">
        {loader && <Loader />}
        <div className="flex justify-around items-center mt-2 py-8 px-4 gap-12 flex-col sm:flex-row sm:gap-28">
          <div>
            <h1 className="text-2xl font-bold"> Account </h1>
            <div>
              <p>Welcome, {user?.email}</p>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <button
              className="border px-4 py-2 rounded-2xl shadow-sm hover:shadow-2xl transition-shadow duration-500"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
            <button
              className="border bg-button text-btnText px-4 py-2 rounded-2xl shadow-sm hover:shadow-2xl transition-shadow duration-500"
              onClick={downloadPasswords}
            >
              Download passwords
            </button>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mt-2 py-8">
            <div className="w-full min-h-[300px] px-4 text-center">
              <h2 className="text-2xl font-bold py-4">Saved Passwords</h2>
              <SavedPasswords />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
