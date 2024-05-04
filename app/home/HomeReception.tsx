import React from 'react'
import Tienda from "../componentes/Recepcionista/Tienda";
import ListaClientes from '../componentes/Recepcionista/ListaClientes';

export default function HomeReception({user}) {
  return (
    <div className='flex w-full'>
        <div className='w-5/12 ring-1 col-span-2'>
          <ListaClientes />
        </div>
        <div className="w-7/12 ring-1 col-span-6">
          <Tienda />
        </div>
      </div>
  )
}
