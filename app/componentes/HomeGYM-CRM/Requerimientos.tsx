import React, {useEffect, useState} from 'react'
import Macros from './Macros'
import {getUserInfo} from "../firebase"


export default function Requerimientos({uid}) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await getUserInfo(uid);
        setUserInfo(userData.Macros);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
      fetchUserInfo();
    }, [uid]);

  console.log(userInfo);
  return (
    

    <div className='m-4'>
       <div className="w-full rounded-2xl p-4 bg-gray-300 ring-4  ring-gray-900/5">
        <p className="text-base font-bold text-gray-900 underline underline-offset-1 ">Requerimientos diários</p>
        <Macros props={userInfo}/>
      </div>
    </div>
  )
}
