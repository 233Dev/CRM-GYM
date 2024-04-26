"use client";
import { useEffect, useState, createContext, useContext } from "react";
import { onAuthStateChanged  } from "firebase/auth";
import { auth } from "./firebase";
import { useRouter } from "next/navigation";

const AuthContext = createContext(); //Dejamos el useContext para despues, no pude.

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
      
      return (
        <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
      );
}

export const useAuth = () => useContext(AuthContext);


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
