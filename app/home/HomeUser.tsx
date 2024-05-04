"use client";
import React, { useState, useEffect } from 'react';
import { getDocumentInfo, getAllDocumentIds, getDocumentById} from "../firebase";
import Suenho from '../componentes/Suenho';
import Requerimientos from '../componentes/Requerimientos';
import Alimento from '../componentes/Alimento';
import Ejercicios from '../componentes/Ejercicios';

{/**HOME CLIENTE */}
export default function page({user}) {
  const [alimentoInfo, setAlimentoInfo] = useState(null);

  useEffect(() => {  // useEffect para obtener los datos de los clientes de Firebase después de que el componente se monte
    async function fetchData() {
      const documentIds = await getAllDocumentIds('alimentos');// Obtener los IDs de todos los documentos
      const alimentoData = await Promise.all(documentIds.map(async (docId) => {// Obtener la información de cada alimento utilizando los IDs de documento
        const alimento = await getDocumentInfo('alimentos', docId);
        return alimento;
      }));
      setAlimentoInfo(alimentoData);// Establecer el estado de alimentos con los datos obtenidos
    }
    fetchData();// Llamar a la función fetchData
  }, []);// Este efecto se ejecuta solo una vez (cuando el componente se monta) debido al array de dependencias vacío []

  console.log(alimentoInfo);// Mostrar los alimentos obtenidos en la consola



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
        <Alimento alimentoInfo={alimentoInfo} />
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