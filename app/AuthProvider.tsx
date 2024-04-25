"use client";
import { useEffect, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, registerNewUser, userExists } from "./firebase";
import { useRouter } from "next/navigation";

export default function AuthProvider({ children, onUserLoggedIn, onUserNotLoggedIn,/**onUserNotRegistered*/}) {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(()=> {
        onAuthStateChanged(auth, async (user) => {
            if(user){
                onUserLoggedIn(user);
            } else{
                onUserNotLoggedIn(); 
            }
        });
      }, []);
      
  return <div>{children}</div>;
}



//en caso de necesitar una validación de unsuario logeado pero no registrado, usar esta lógica

{/**
useEffect(()=> {
        onAuthStateChanged(auth, async (user) => {
            if(user){
                const isRegistered = await userExists(user.uid);
                if(isRegistered){
                    onUserLoggedIn(user);
                }else {
                    onUserNotRegistered(user);
                }
            } else{
                onUserNotLoggedIn(); 
            }
        });
      }, []);
*/}
