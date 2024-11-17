"use client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../services/firebase";
import { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const handleRegister = async (e: any) => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      if (password.length < 6) {
        alert("Password should be at least 6 characters");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        `${username}@example.com`,
        password
      );

      // สร้างเอกสารใน Firestore
      const results = await setDoc(doc(db, "users", userCredential.user.uid), {
        username,
        email: userCredential.user.email,
        password, // เข้ารหัสก่อนใช้งานจริง
      });

      alert("Register Successfully");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error: any) {
      console.log(error);

      alert(` ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="bg-gray-500 shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="username" className="block font-medium mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded-md px-3 py-2 w-full"
              placeholder="Enter a username"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-md px-3 py-2 w-full"
              placeholder="Enter a password"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block font-medium mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border rounded-md px-3 py-2 w-full"
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-medium rounded-md px-4 py-2 w-full hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export { RegisterPage };
