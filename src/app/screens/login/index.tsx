"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { auth } from "../../../services/firebase";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(
        auth,
        `${username}@example.com`,
        password
      );
      router.push("/menu"); // ไปที่หน้า Menu เมื่อล็อกอินสำเร็จ
    } catch (error: any) {
      alert(error.message);
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div className="bg-gray-500 shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">
              Username
            </label>
            <input
              id="Username"
              className="border rounded-md px-3 py-2 w-full"
              placeholder="Enter your Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="border rounded-md px-3 py-2 w-full"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white font-medium rounded-md px-4 py-2 w-full hover:bg-blue-600"
            >
              Login
            </button>
            <button
              type="button"
              className="bg-green-500 text-white font-medium rounded-md px-4 py-2 w-full hover:bg-blue-600"
              onClick={() => router.push("/register")}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
