"use client";
import React from 'react'
import Suenho from "./Suenho"
import Requerimientos from './Requerimientos';
import Alimento from '../Alimento';
import Ejercicios from "./Ejercicios";

{/**HOME CLIENTE */}
export default function page() {
  const userId = 'hGO11kqjGTfJSJNdhZZqCEyyGm62';
  return (
    <>
    <div className='flex w-full'>

      <div className='w-3/12 ring-1 col-span-2'>{/**
  *Monitorización del tiempo de sueño.
    **Tiempo total dormido
    **Tiempo total en sueños de 6 hrs mínimo
  *Requerimientos alimenticios por día (consultar con alguien que sepa de nutrición deportiva).*/}
        <Suenho /> 
        <Requerimientos uid={userId}/>
        <Alimento alimento="1"/>
      </div>

      <div className="w-5/12 ring-1 col-span-6">{/**
  *El entrenamiento para hoy.
    **Equercicios.
    **Máquinas requeridas/Máquinas disponibles.*/}
        <Ejercicios />
      </div>
      <div className="w-4/12 ring-1 col-span-4">{/**
  *Registro alimenticio(Sección para anotar lo que consumes en el día).
    *Contador de nutrientes.
    *Relacionado con la tabla [RECETAS].
  *Porcentaje total en progreso.
    **Línea de tiempo
    **Alimentación (saludable/chatarra)*/}
        <img className='m-t rpundder' src=" ../ejercicios/mapaCuerpo.png " alt="" />
        <div>Registro alimenticio</div>
        
      </div>
      

    </div>
    </>
  )
}

{/**
¿Estás registrado? la primer página será “Home”: 
  -El entrenamiento para hoy.
    Máquinas requeridas/Máquinas disponibles.
  _Registro alimenticio(Sección para anotar lo que consumes en el día).
    Contador de nutrientes.
    Relacionado con la tabla [RECETAS].
  -Monitorización del tiempo de sueño.
    tiempo total dormido
    tiempo total en sueños de 6 hrs mínimo
  -Porcentaje total en progreso.
    Línea de tiempo
    alimentación (saludable/chatarra)
  -Requerimientos alimenticios por día (consultar con alguien que sepa de nutrición deportiva).
*/}