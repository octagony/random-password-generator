import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import SavedPasswords from "../components/SavedPasswords";

const Account = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await logout();
      router.push("/signin");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      router.push("/signup");
    }
  }, [router, user]);

  return (
    <div className="max-w-[1140px] mx-auto">
      <div className="flex justify-between items-center my-12 py-8 px-4">
        <div>
          <h1 className="text-2xl font-bold"> Account </h1>
          <div>
            <p>Welcome, {user?.email}</p>
          </div>
        </div>
        <div>
          <button
            className="border px-4 py-2 rounded-2xl shadow-sm hover:shadow-2xl"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center my-12 py-8">
          <div className="w-full min-h-[300px] px-4">
            <h2 className="text-2xl font-bold py-4">Saved Passwords</h2>
            <SavedPasswords />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
