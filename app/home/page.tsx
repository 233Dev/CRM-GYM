"use client";
import React, { useEffect, useState } from 'react';
import AuthProvider from "../AuthProvider";
import { getDocumentInfo } from "../firebase";
import { useRouter } from "next/navigation";
import HomeUser from './HomeUser';
import HomeAdmin from './HomeAdmin';
import HomeReception from './HomeReception';
import HomeTrainer from './HomeTrainer';
import Register from './Register';

export default function HomePage() {
    const router = useRouter();
    const [uid, setUID] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [toRender, setToRender] = useState(<div>Cargando...</div>); // Inicialmente muestra un mensaje de carga

    useEffect(() => {
        async function getData() {
            try {
                const userData = await getDocumentInfo("usuarios", uid);
                setUserInfo(userData);
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
            }
        }

        if (uid) {
            getData();
        }
    }, [uid, refresh]);

    useEffect(() => {
        if (userInfo) {
            const rol = userInfo.rol;
            setToRender(
                !rol ? <div>No hay ningún rol registrado</div> :
                rol === 1 ? <HomeUser user={userInfo} /> :
                rol === 2 ? <HomeReception user={userInfo} /> :
                rol === 3 ? <HomeTrainer user={userInfo} /> :
                rol === 4 ? <HomeAdmin user={userInfo} /> :
                rol === 5 ? <Register user={userInfo} setRefresh={setRefresh} refresh={refresh} /> :
                <div>Tu perfil no contiene un rol válido asignado</div>
            );

        }
    }, [userInfo, refresh]); // Actualiza cuando userInfo o refresh cambian

    function handleUserLoggedIn(user) {
        setUID(user.uid);
    }

    function handleUserNotLoggedIn() {
        router.push("/login");
    }

    return (
        <AuthProvider
            onUserLoggedIn={handleUserLoggedIn}
            onUserNotLoggedIn={handleUserNotLoggedIn}
        >
            <div>
                {toRender}
            </div>
        </AuthProvider>
    );
}

