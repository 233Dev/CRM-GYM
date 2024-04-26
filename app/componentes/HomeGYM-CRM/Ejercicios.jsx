// Componente Ejercicios
import React from 'react';
import Ejercicio from './Ejercicio';

const ejercicios = [{
    nombre: "Peck Deck",
    posicionInicial: 'Sentado en la máquina de "peck deck" con la espalda presionada contra el respaldo, tus antebrazos bien apoyados contra las partes acolchadas proporcionadas para este propósito. Tus brazos superiores deben estar paralelos al suelo y en línea con tus hombros.',
    imagen: "../ejercicios/peckDeck.PNG",
    dificultad: "Fácil",
    ejecucion: "Aprieta tus brazos tanto como sea posible siguiendo el movimiento de la máquina. Aprieta tu pecho al final del movimiento y luego regresa lentamente a la posición inicial.",
    tipoDeEjercicio: 15,
    equipos: "peck Deck",
    gruposMusculares:["pecho", "hombros"],
},
{
  nombre: "Lagartija",
  posicionInicial: 'Sentado en la máquina de "peck deck" con la espalda presionada contra el respaldo, tus antebrazos bien apoyados contra las partes acolchadas proporcionadas para este propósito. Tus brazos superiores deben estar paralelos al suelo y en línea con tus hombros.',
  imagen: "../ejercicios/peckDeck.PNG",
  dificultad: "Fácil",
  ejecucion: "Aprieta tus brazos tanto como sea posible siguiendo el movimiento de la máquina. Aprieta tu pecho al final del movimiento y luego regresa lentamente a la posición inicial.",
  tipoDeEjercicio: 15,
  equipos: "peck Deck",
  gruposMusculares:["pecho", "brazos"],
},
{
  nombre: "Sentadilla",
  posicionInicial: 'Sentado en la máquina de "peck deck" con la espalda presionada contra el respaldo, tus antebrazos bien apoyados contra las partes acolchadas proporcionadas para este propósito. Tus brazos superiores deben estar paralelos al suelo y en línea con tus hombros.',
  imagen: "../ejercicios/peckDeck.PNG",
  dificultad: "Fácil",
  ejecucion: "Aprieta tus brazos tanto como sea posible siguiendo el movimiento de la máquina. Aprieta tu pecho al final del movimiento y luego regresa lentamente a la posición inicial.",
  tipoDeEjercicio: 15,
  equipos: "peck Deck",
  gruposMusculares:["gluteos", "cuadriceps"],
},{
  nombre: "Plancha",
  posicionInicial: 'Sentado en la máquina de "peck deck" con la espalda presionada contra el respaldo, tus antebrazos bien apoyados contra las partes acolchadas proporcionadas para este propósito. Tus brazos superiores deben estar paralelos al suelo y en línea con tus hombros.',
  imagen: "../ejercicios/peckDeck.PNG",
  dificultad: "Fácil",
  ejecucion: "Aprieta tus brazos tanto como sea posible siguiendo el movimiento de la máquina. Aprieta tu pecho al final del movimiento y luego regresa lentamente a la posición inicial.",
  tipoDeEjercicio: 15,
  equipos: "peck Deck",
  gruposMusculares:["Abdomen", "hombros"],
}];

export default function Ejercicios() {
  return (
    <div className="flex flex-wrap justify-center gap-1">
      {/* Itera sobre cada objeto de ejercicios */}
      {ejercicios.map((ejercicio, index) => (
        <Ejercicio key={index} ejercicio={ejercicio} />
      ))}
    </div>
  );
}
