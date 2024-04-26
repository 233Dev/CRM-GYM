"use client";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, registerNewUser, userExists } from "./firebase";
import { useRouter } from "next/navigation";
import Servicio from "./componentes/Servicio";
import Instalaciones from "./componentes/Instalaciones";
import TablaMembresias from "./componentes/TablaMembresias";
import Header from "./componentes/Header";
import NavBar from "./componentes/NavBar";

export default function PrincipalPage() {
  const router = useRouter();  

  return (
    <div
      style={{
        backgroundImage: "url('/bg-pesa.jpg')",
        backgroundSize: "cover",
      }}
    >
        <NavBar/>
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