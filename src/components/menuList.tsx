"use client";
import { useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export const MenuList = () => {
  const [user, setUser] = useState("");
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };
  return (
    <nav>
      <ul>
        <li className="mb-2">
          <div className="hover:text-gray-400" onClick={() => router.push("/")}>
            Homepage
          </div>
        </li>
        <li className="mb-2">
          <div
            className="hover:text-gray-400"
            onClick={() => router.push("/menu")}
          >
            Menu
          </div>
        </li>
        {!user ? (
          <>
            <li className="mb-2">
              <div
                className="hover:text-gray-400"
                onClick={() => router.push("/login")}
              >
                Login
              </div>
            </li>
            <li className="mb-2">
              <div
                className="hover:text-gray-400"
                onClick={() => router.push("/register")}
              >
                Register
              </div>
            </li>
          </>
        ) : (
          <li className="mb-2">
            <button className="hover:text-gray-400" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};
