"use client";
import React, { useEffect } from "react";
import { uploadToFirestore } from "../firebase";

export default function page() {
  const arreglo = [
    { id: 1, nombre: 'Proteina', imagen:"../71R4ZRxBgJL.jpg", precio: 10, stock: 5 },
    { id: 2, nombre: 'Ropa Deportiva', imagen:"../71R4ZRxBgJL.jpg", precio: 15, stock: 10 },
    { id: 3, nombre: 'Bebida Hidratante', imagen:"../71R4ZRxBgJL.jpg", precio: 20, stock: 3 },
    { id: 4, nombre: 'Proteina', imagen:"../71R4ZRxBgJL.jpg", precio: 10, stock: 5 },
    { id: 5, nombre: 'Ropa Deportiva', imagen:"../71R4ZRxBgJL.jpg", precio: 15, stock: 10 },
    { id: 6, nombre: 'Agua', imagen:"../71R4ZRxBgJL.jpg", precio: 20, stock: 3 },
    { id: 7, nombre: 'Proteina', imagen:"../71R4ZRxBgJL.jpg", precio: 10, stock: 5 },
    { id: 8, nombre: '1 scup de preE', imagen:"../71R4ZRxBgJL.jpg", precio: 15, stock: 300 },
    { id: 9, nombre: 'Bebida Hidratante', imagen:"../71R4ZRxBgJL.jpg", precio: 20, stock: 3 },
  ];


  const arrayName = "inventario";

  function handleClick(){
    uploadToFirestore(arreglo, arrayName);
  };


  

  return <><button className="m-2" onClick={handleClick}>Subir {arrayName}</button></>;
}
