"use client";
{/** ERROR MAS GRANDE QUE ME ENSEÑO ESTE COMPONENTE */}
{/**El problema se debe a que estás intentando acceder a
la propiedad rol de userInfo fuera del efecto de useEffect.
Cuando el componente se renderiza por primera vez, userInfo aún es null
porque la llamada a getUserInfo es asíncrona y tomará algo 
de tiempo antes de que se complete y actualice el estado de userInfo.

Por lo tanto, cuando intentas acceder a userInfo.rol directamente
fuera del efecto, userInfo todavía es null, lo que genera un 
error de "TypeError: Cannot read property 'rol' of null".

La forma correcta de manejar esto es realizar cualquier lógica
relacionada con userInfo dentro del efecto o mediante un operador
condicional que maneje el caso en que userInfo sea null.  */}


import React, { useEffect, useState } from 'react'
import AuthProvider from "../AuthProvider";
import {getUserInfo} from "../firebase"
import { useRouter } from "next/navigation";
import HomeUser from '../componentes/HomeUser';
import HomeAdmin from '../componentes/HomeAdmin';
import HomeReception from '../componentes/HomeReception'; 

export default function HomePage() {
  const [uid, setUID] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();

  function handleUserLoggedIn(user){
    setUID(user.uid);
  }
  function handleUserNotLoggedIn(){
    router.push("/login");
  }

  useEffect( () => {
    async function getData() {
      try {
        const userData = await getUserInfo(uid);
        setUserInfo(userData);
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    }

    if (uid) {
      getData();
    }
  } , [uid] );

  const rol = userInfo ? userInfo.rol : null;

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotLoggedIn={handleUserNotLoggedIn}
    > 
      <div>
        test para el rol de usuario: {rol}
        {rol==="1" ? <HomeUser/>:
         rol==="2" ? <HomeReception/>:
         rol==="3" ? <HomeAdmin/>:"Tu perfil no contiene un rol válido asignádo"}
      </div>
    </AuthProvider>
  )
}