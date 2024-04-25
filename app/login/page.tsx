"use client";
import React, { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, registerNewUser, userExists } from "../firebase";
import { useRouter } from "next/navigation";
import Login from "../componentes/Login";
import AuthProvider from "../AuthProvider";

export default function Page() {
  const [currentUser, setCurrentUser] = useState(null);
  const [state, setCurrentState] = useState(false);
  const router = useRouter();

  async function handleOnClick() {
    const googleProvider = new GoogleAuthProvider();
    await singInWithGoogle(googleProvider);
    async function singInWithGoogle(googleProvider) {
      try {
        const res = await signInWithPopup(auth, googleProvider);
      } catch (error) {
        console.error(error);
      }
    }
  }

  function handleUserLoggedIn(user){
    router.push("/home");
  }
  function handleUserNotLoggedIn(){
    router.push("/login");
  }

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center p-24"
      style={{
        backgroundImage: "url('/bg-login.jpg')",
        backgroundSize: "cover",
      }}
    ><AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotLoggedIn={handleUserNotLoggedIn}>
      <Login signInWithGoogle={handleOnClick} />
      </AuthProvider>
    </div>
    
  );
}