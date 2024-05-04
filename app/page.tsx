"use client";
import Servicio from "./componentes/LandingPage/Servicio";
import Instalaciones from "./componentes/LandingPage/Instalaciones";
import TablaMembresias from "./componentes/LandingPage/TablaMembresias";
import Header from "./componentes/LandingPage/Header";

export default function PrincipalPage() {

  return (
    <div
      style={{
        backgroundImage: "url('/bg-pesa.jpg')",
        backgroundSize: "cover",
      }}
    >
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