"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // Se importa signInWithPopup para iniciar sesión con Google
import { auth, registerNewUser, userExists } from "../firebase"; // Se importa el objeto 'auth' desde el archivo firebase
import Login from "./Login";
import AuthProvider from "../AuthProvider";

export default function Home() {
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();

  const handleOnClick = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, googleProvider);
      setCurrentUser(res.user);
      console.log(currentUser);
      // Verificar si el usuario ya existe en la base de datos
      const exists = await userExists(res.user.uid);
      if (!exists) {
        console.log(res.user);
        // Si el usuario no existe, registrar nuevo usuario en la base de datos
        await registerNewUser({
          uid: res.user.uid,
          email: res.user.email,
          nombre: res.user.displayName,
          nacimiento: null,
          telefono: null,
          membresia: "Pagada",
          rol: "1",
          altura: null,
          peso: null,
          sexo: false,
          alacena: [3, 4, 5]
        });
      }

      console.log(res.user.photoURL);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

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
    >
      <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotLoggedIn={handleUserNotLoggedIn}>
        <Login signInWithGoogle={handleOnClick} />
      </AuthProvider>
    </div>
    
  );
  
}