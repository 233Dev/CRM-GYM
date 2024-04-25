"use client";
import React from 'react'
import AuthProvider from "../AuthProvider";
import { useRouter } from "next/navigation";
import HomeUser from '../componentes/HomeUser';

export default function page() {
  const router = useRouter();

  function handleUserLoggedIn(user){
    router.push("/home");
  }
  function handleUserNotLoggedIn(){
    router.push("/login");
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotLoggedIn={handleUserNotLoggedIn}
    >
      <HomeUser/>
    </AuthProvider>
  )
}
