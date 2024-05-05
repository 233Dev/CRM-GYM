import React from 'react'

export default function FiltradoArray() {
  const alimentos = [
    { id: 1, nombre: 'Manzana', stock: 10, precioPorKg: 2 },
    { id: 2, nombre: 'Plátano', stock: 5, precioPorKg: 3 },
    { id: 3, nombre: 'Naranja', stock: 8, precioPorKg: 2.5 },
    { id: 4, nombre: 'Pera', stock: 12, precioPorKg: 1.8 },
    { id: 5, nombre: 'Uva', stock: 7, precioPorKg: 4 }
  ];

  const usuario = {
    id: 1,
    nombre: 'Juan',
    listaDeCompra: [1, 3, 5] // IDs de los alimentos que necesita comprar
  };

  console.log(usuario.listaDeCompra);
  const alimentosEnListaDeCompra = alimentos.filter(alimento => usuario.listaDeCompra.includes(alimento.id));
  console.log(alimentosEnListaDeCompra);

  return (
    <div>FiltradoArray</div>
  )
}

  