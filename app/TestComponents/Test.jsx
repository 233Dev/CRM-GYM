import React, { useState } from 'react';

export default function Test({ productosEnCarrito }) {
  // Estado para almacenar el monto de pago
  const [montoPago, setMontoPago] = useState('');
  // Estado para almacenar el cambio
  const [cambio, setCambio] = useState(0);

  // Calcula el total de la compra
  const totalCompra = productosEnCarrito.reduce((total, producto) => total + producto.precio, 0);

  // Función para manejar el cambio al hacer clic en el botón "Calcular Cambio"
  const calcularCambio = () => {
    // Convertir el monto de pago a número
    const pago = parseFloat(montoPago);
    // Verificar si el monto de pago es válido
    if (!isNaN(pago)) {
      // Calcular el cambio
      const cambioCalculado = pago - totalCompra;
      // Actualizar el estado del cambio
      setCambio(cambioCalculado);
    }
  };

  return (
    <div className="bg-gray-200 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Carrito de Compras</h2>
      <div className="overflow-y-auto max-h-60">
        {/* Mapea los productos en el carrito */}
        {productosEnCarrito.map(producto => (
          <div key={producto.id} className="flex items-center border-b border-gray-300 py-2">
            <img src={producto.imagen} alt={producto.nombre} className="w-10 h-10 object-cover rounded mr-2" />
            <div>
              <p className="font-semibold">{producto.nombre}</p>
              <p className="text-gray-600">${producto.precio}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Sección de total */}
      <div className="mt-4">
        <p className="text-lg font-semibold">Total: ${totalCompra}</p>
      </div>
      {/* Sección de pago y cambio */}
      <div className="mt-4">
        <label htmlFor="pago" className="block">Pago:</label>
        <input
          type="number"
          id="pago"
          className="border border-gray-300 px-2 py-1 rounded"
          value={montoPago}
          onChange={(e) => setMontoPago(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
          onClick={calcularCambio}
        >
          Calcular Cambio
        </button>
        {/* Mostrar el resultado del cambio */}
        {cambio > 0 && (
          <p className="mt-2">Cambio: ${cambio}</p>
        )}
      </div>
    </div>
  );
}
