import React from 'react'

export default function Servicio(props) {
  return (
    <div className=" bg-gray-400 bg-opacity-40 mx-1 border-2 w-auto  justify-center border-s-700 rounded-2xl text-center ">
      <center>{/** el className justify-center, items-center, aling-center, no funcionaron */}
        <img className="rounded-t-lg h-80" src = {props.imagen} alt="" />
      </center>
      <div className="px-6 py-4">
        <div className="text-gray-300 font-bold text-xl mb-2">{props.titulo}</div>
        <p className="text-gray-300 text-base">
          Este es el texto de la tarjeta. Aquí pondremos la descripción del servicio, dejabajo irá el precio.
        </p>
      </div>
  </div>
  )
}