"use client";
import React, { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, registerNewUser, userExists } from "./firebase";
import { useRouter } from "next/navigation";
import Login from "./componentes/Login";
import AuthProvider from "./AuthProvider";
import Servicio from "./componentes/Servicio";
import Instalaciones from "./componentes/Instalaciones";
import DatosPersona from "./componentes/DatosPersona";
import TablaMembresias from "./componentes/TablaMembresias";
import Header from "./componentes/Header";
import NavBar from "./componentes/NavBar";

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
  function handleUserNotRegistered(user){
    router.push("/");
  }
  function handleUserNotLoggedIn(){
    router.push("/");

  }

    return (
      <div
        style={{
          backgroundImage: "url('/bg-pesa.jpg')",
          backgroundSize: "cover",
        }}
      >
        {/* <NvBar/> fuera del Layout por no poder estableceru (!ser.exist)*/}
        {/*          * como un parametro para desplegar el boton login o los botones*/}
        {/*          * a los links y la foto con nombre de usuario.*/}
        <div className="flex h-16 items-center justify-between bg-gray-900 mx-max px-2 sm:px-6 lg:px-8">{/*DIV que debería ser una etiqueta NavBar. */}
            <div>
              <a href="/"> 
                <img
                  className="overflow-hidden h-16 w-auto rounded-full" 
                  src="https://m.media-amazon.com/images/I/51SDRru7eaL._UXNaN_FMjpg_QL85_.jpg" 
                  alt="Your Company" 
                />
              </a>
            </div>
            <div className="p-2">
              <button  
                type="button"
                onClick={() => router.push('/login')}
                className="rounded-xl bg-sky-800 p-2 text-gray-300 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Login
              </button>
            </div>
        </div>
      
          <Header />{/* presentacion del logo */}
        <div className="p-20 opacity-70">{/* Presentacion de las instalaciones */} 
          <Instalaciones /> 
        </div> 
        <div className="mx-2 flex justify-between w-auto">{/* PresentacionServicios. (versión 1.2) Se puede hacer componente para reducir código. (versión2.0=>coominsoon) Un solo componente con un map(). */}
          <Servicio titulo="YOGA" imagen="../klipartz.com (2).png" precio="300"/>
          <Servicio titulo="GYM" imagen="../klipartz.com (4).png" precio="380"/>
          <Servicio titulo="PERSONALIZADO" imagen="../klipartz.com (3).png" precio="1200"/>
        </div>
        <div className="p-4">{/* Caracteristicas generale de cada servicio. Para rellenar visualmente y resolver preguntas frecuentes antes de que surjan. */}
          <TablaMembresias/>
        </div>
      </div>

    );
}