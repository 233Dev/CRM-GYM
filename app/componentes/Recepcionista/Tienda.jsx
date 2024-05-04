import React, { useState } from 'react';
import Carrito from '../Recepcionista/Carrito'; // Asegúrate de ajustar la ruta si es necesario


const inventario = [
  { id: 1, nombre: 'Proteina', imagen:"../71R4ZRxBgJL.jpg", precio: 10, stock: 5 },
  { id: 2, nombre: 'Ropa Deportiva', imagen:"../71R4ZRxBgJL.jpg", precio: 15, stock: 10 },
  { id: 3, nombre: 'Bebida Hidratante', imagen:"../71R4ZRxBgJL.jpg", precio: 20, stock: 3 },
  { id: 4, nombre: 'Proteina', imagen:"../71R4ZRxBgJL.jpg", precio: 10, stock: 5 },
  { id: 5, nombre: 'Ropa Deportiva', imagen:"../71R4ZRxBgJL.jpg", precio: 15, stock: 10 },
  { id: 6, nombre: 'Agua', imagen:"../71R4ZRxBgJL.jpg", precio: 20, stock: 3 },
  { id: 7, nombre: 'Proteina', imagen:"../71R4ZRxBgJL.jpg", precio: 10, stock: 5 },
  { id: 8, nombre: '1 scup de preE', imagen:"../71R4ZRxBgJL.jpg", precio: 15, stock: 300 },
  { id: 9, nombre: 'Bebida Hidratante', imagen:"../71R4ZRxBgJL.jpg", precio: 20, stock: 3 },
  // Agregar más productos según sea necesario
];


export default function Tienda() {
  const [productosEnCarrito, setProductosEnCarrito] = useState([]);

  // Función para agregar un producto al carrito
  const agregarAlCarrito = (producto) => {
    setProductosEnCarrito([...productosEnCarrito, producto]);
  };

  return (
    <div className="flex container mx-auto">
      <div className="w-4/6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> 
        {inventario.map(producto => (
          <div key={producto.id} className="bg-white rounded-lg shadow-md p-4">
            <img src={producto.imagen} alt={producto.nombre} className="w-full h-32 object-cover mb-4" />
            <h3 className="text-md font-semibold">{producto.nombre}</h3>
            <p className="text-gray-600 ">${producto.precio}</p>
            <p className="text-gray-600 ">Stock: {producto.stock}</p>
            <button onClick={() => agregarAlCarrito(producto)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">añadir</button>
          </div>
        ))}
      </div>
      <div className='w-2/6'>
        <Carrito productosEnCarrito={productosEnCarrito} />
      </div>
    </div>    
  )
}