import React, { useState, useEffect } from 'react';
import { fetchAndFilter } from "../../firebase";

export default function Tienda({ setProductosEnCarrito, productosEnCarrito }) {
  const [inventario, setInventario] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await fetchAndFilter('inventario', null, [], setInventario);
    }
    fetchData();
  }, []);

  const agregarAlCarrito = (producto) => {
    setProductosEnCarrito([...productosEnCarrito, producto]); // (... = operador de propagaciónsss)Actualiza el estado en HomeReception
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 opacity-90"> 
      {inventario.map(producto => (
        <div key={producto.id} className="bg-white rounded-lg shadow-md p-4">
          <img src={producto.imagen} alt={producto.nombre} className="w-full h-32 object-cover mb-4" />
          <h3 className="text-md font-semibold">{producto.nombre}</h3>
          <p className="text-gray-700 ">${producto.precio}</p>
          <p className="text-xs text-gray-500 ">Stock: {producto.stock}</p>
          <button onClick={() => agregarAlCarrito(producto)} className="bg-blue-500 bg-opacity-100 text-white px-4 py-2 rounded-lg">añadir</button>
        </div>
      ))}
    </div>
  )
}