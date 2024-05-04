import React from 'react'
import { registerNewUserTest } from '../firebase';


export default function Macros({props}) {
  return (
        <>
        <p className="flex items-baseline justify-center gap-x-2">
            <span className="text-5 font-semibold leading-6 tracking-wide text-gray-600">Calorias</span>
            <span className="text-6 font-bold tracking-tight text-gray-900">{props[0]}</span> 
        </p>
        <p className="flex items-baseline justify-center gap-x-2">
            <span className="text-5 font-semibold leading-6 tracking-wide text-gray-600">Proteinas</span>
            <span className="text-6 font-bold tracking-tight text-gray-900">{props[1]}</span> 
        </p>
        <p className="flex items-baseline justify-center gap-x-2">
            <span className="text-5 font-semibold leading-6 tracking-wide text-gray-600">Carbohidratos</span>
            <span className="text-6 font-bold tracking-tight text-gray-900">{props[2]}</span>
        </p>
        <p className="flex items-baseline justify-center gap-x-2">
            <span className="text-5 font-semibold leading-6 tracking-wide text-gray-600">Grasas</span>
            <span className="text-6 font-bold tracking-tight text-gray-900">{props[3]}</span>
        </p>
        </>
  )
}
