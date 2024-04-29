"use client";
import React from 'react'
import ListaClientes from './ListaClientes';
import Tienda from "./Tienda";


export default function page() {
  return (
    <>
      <div className='flex w-full'>
        <div className='w-5/12 ring-1 col-span-2'>
          <ListaClientes />
        </div>
        <div className="w-7/12 ring-1 col-span-6">
          <Tienda />
        </div>
      </div>
    </>
  )
}