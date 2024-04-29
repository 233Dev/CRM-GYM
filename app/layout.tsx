"use client";
import React, { useState } from 'react'
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./componentes/NavBar";
import { useRouter } from "next/navigation";
import AuthProvider from "./AuthProvider";
import Metadata from './componentes/Metadata';

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [currentUser, setCurrentUser] = useState();
  const router = useRouter();

  const metadata = {
    title: 'Inicio - Mi Sitio',
    description: 'Bienvenido a mi sitio web',
    // Agrega más metadatos aquí según sea necesario
  };
  
  function handleUserLoggedIn(user){
    setCurrentUser(user);

    console.log(currentUser);
  }
  function handleUserNotLoggedIn(){
  }

  return (

    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotLoggedIn={handleUserNotLoggedIn}
    >
    <html lang="en">
    <Metadata metadata={metadata} />
      <body className={inter.className}>
        <NavBar user={currentUser}/>
        <main className="bg-transparent">
          {children}
        </main>
      </body>
    </html>
    </AuthProvider>
  );
}
