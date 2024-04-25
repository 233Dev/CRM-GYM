"use client";
import React from 'react'

const receta = {
    nombre: "Ensalada de Pollo y Aguacate",
    descripcion: "Una deliciosa ensalada fresca con pollo a la parrilla, aguacate cremoso y aderezo de limón.",
    imagen: "https://okdiario.com/img/2019/08/10/receta-de-ensalada-con-aguacate-y-pollo-asado-1-655x368.jpg",
    dificultad: "Fácil",
    tiempoPreparacion: 15,
    tiempoCoccion: 15,
    porciones: 4,
    ingredientes: [
      { nombre: "Pechuga de pollo", cantidad: 2, unidad: "tazas" },
      { nombre: "Aguacate", cantidad: 2, unidad: "piezas" },
      { nombre: "Lechuga", cantidad: 4, unidad: "tazas" },
      { nombre: "Tomate cherry", cantidad: 1, unidad: "taza" },
      { nombre: "Cebolla roja", cantidad: 1, unidad: "pieza" },
      { nombre: "Aceite de oliva", cantidad: 2, unidad: "cucharadas" },
      { nombre: "Limón", cantidad: 1, unidad: "pieza" },
      { nombre: "Sal", cantidad: 1, unidad: "pizca" },
      { nombre: "Pimienta", cantidad: 1, unidad: "pizca" },
    ],
    instrucciones:[
      "Cocina la quinoa según las instrucciones del paquete. Deja enfriar.",
      "Cocina la pechuga de pollo a la parrilla o a la plancha hasta que esté bien cocida. Corta en trozos pequeños.",
      "Corta el pepino, el pimiento rojo, el tomate y el aguacate en cubos.",
      "En un tazón grande, mezcla la quinoa cocida, el pollo y las verduras cortadas.",
      "Exprime el jugo de limón sobre la ensalada y agrega un chorrito de aceite de oliva. Mezcla bien.",
      "Sazona con sal y pimienta al gusto.",
      "Sirve y disfruta."
  ],
    nutricion: {
      calorias: 250,
      proteinas: 25,
      carbohidratos: 10,
      grasas: 15,
      fibra: 5,
      vitaminas: {
        vitaminaA: "15% DV",
        vitaminaC: "20% DV",
      },
      minerales: {
        calcio: "10% DV",
        hierro: "8% DV",
        potasio: "12% DV",
        magnesio: "6% DV",
      },
    },
  };  

export default function Receta() {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      {/* Imagen de la receta */}
      <div className="relative">
        <img src={receta.imagen} alt={receta.nombre} className="w-full h-auto rounded-t-xl" />

        {/* Contenedor de datos de nutrición */}
        <div className="absolute top-0 right-0 p-4 bg-white bg-opacity-50 rounded-lg">
          <h2 className="text-lg font-semibold">{receta.nombre}</h2>
          <div className="mt-2">
            <p>Calorías: {receta.nutricion.calorias}</p>
            <p>Proteínas: {receta.nutricion.proteinas}g</p>
            <p>Carbohidratos: {receta.nutricion.carbohidratos}g</p>
            <p>Grasas: {receta.nutricion.grasas}g</p>
            <p>Fibra: {receta.nutricion.fibra}g</p>
          </div>
        </div>
      </div>

      {/* Contenido de la receta */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Columna de ingredientes */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Ingredientes:</h3>
            <ul>
              {receta.ingredientes.map((ingrediente, index) => (
                <li key={index}>{ingrediente.cantidad} {ingrediente.unidad} de {ingrediente.nombre}</li>
              ))}
            </ul>
          </div>

          {/* Columna de descripción, porciones, dificultad y tiempos */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Detalles:</h3>
            <p>{receta.descripcion}</p>
            <p>Porciones: {receta.porciones}</p>
            <p>Dificultad: {receta.dificultad}</p>
            <p>Tiempo de preparación: {receta.tiempoPreparacion} minutos</p>
            <p>Tiempo de cocción: {receta.tiempoCoccion} minutos</p>
          </div>
        </div>

        {/* Pasos de preparación */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Instrucciones:</h3>
          <ol>
            {receta.instrucciones.map((instruccion, index) => (
              <li key={index}>{instruccion}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
};

