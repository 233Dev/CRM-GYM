"use client";
import React, { useState, useEffect } from 'react';
import { fetchAndFilter } from "../firebase";
import Suenho from '../componentes/Suenho';
import Requerimientos from '../componentes/Requerimientos';
import Alimento from '../componentes/Alimento';
import Ejercicios from '../componentes/Ejercicios';

{/**HOME CLIENTE */}
export default function page({user}) {
  const [alimentoAlacena, setAlimentoAlacena] = useState(null);
  const [rutina, setRutina] = useState([]);

  const hoy = new Date();// Obtener la fecha actual para saber el día y asignar la rutina
  const dia = hoy.getDay();
  const ejerciciosDeHoy = dia===0 ? user.domingo :
                          dia===1 ? user.lunes :
                          dia===2 ? user.martes :
                          dia===3 ? user.miercoles :
                          dia===4 ? user.jueves :
                          dia===5 ? user.viernes : user.sabado;
      
  useEffect(() => {
    fetchAndFilter('alimentos', 'ID', user.alacena, setAlimentoAlacena);
  }, [user.alacena]);
  
  useEffect(() => {
    fetchAndFilter('ejercicios', 'Id', ejerciciosDeHoy, setRutina);
  }, [ejerciciosDeHoy]);

  return (
    <>
    <div className='flex w-full'>

      <div className='w-3/12 ring-1 col-span-2'>{/**
  *Monitorización del tiempo de sueño.
    **Tiempo total dormido
    **Tiempo total en sueños de 6 hrs mínimo
  *Requerimientos alimenticios por día (consultar con alguien que sepa de nutrición deportiva).*/}
        <Suenho /> 
        <Requerimientos userInfo={user}/>
        <Alimento alimentoInfo={alimentoAlacena} />
      </div>

      <div className="w-5/12 ring-1 col-span-6">{/**
  *El entrenamiento para hoy.
    **Equercicios.
    **Máquinas requeridas/Máquinas disponibles.*/}
        <Ejercicios ejercicios={rutina}/>
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