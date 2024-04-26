"use client";
import React, { useState } from 'react'
import AuthProvider, { useAuth } from "../AuthProvider";
import { useRouter } from "next/navigation";
import HomeUser from '../componentes/HomeUser';

export default function HomePage() {
  const [user, setUser] = useState();
  const router = useRouter();

  function handleUserLoggedIn(user){
    router.push("/home");
    setUser(user);

    console.log(user);
  }
  function handleUserNotLoggedIn(){
    router.push("/login");
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotLoggedIn={handleUserNotLoggedIn}
    >
      <HomeUser user={user}/>
    </AuthProvider>
  )
}