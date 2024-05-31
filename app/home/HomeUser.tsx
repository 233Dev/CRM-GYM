"use client";
import React, { useState, useEffect } from 'react';
import { fetchAndFilter, fetchAndFilterSubcollection } from "../firebase";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import Suenho from '../componentes/Users/Suenho';
import Requerimientos from '../componentes/Users/Requerimientos';
import Alimento from '../componentes/Users/Alimento';
import Ejercicios from '../componentes/Users/Ejercicios';
import Recetas from '../componentes/Users/Recetas';
import Alacena from '../componentes/Users/Alacena';
import UpdateAlacena from '../componentes/Users/UpdateAlacena';

{/**HOME CLIENTE */}
export default function page({ user }) {
  const [alimentosAlacena, setAlimentosAlacena] = useState([]);
  const [subAlacena, setSubAlacena] = useState([]);
  const [openAlacena, setOpenAlacena] = useState(false);
  const [actualizarAlacena, setActualizarAlacena] = useState(false);
  const [alacena, setAlacena] = useState([])
  const [rutina, setRutina] = useState([]);
  const [recetas, setRecetas] = useState(null);
  const [verReceta, setVerReceta] = useState(false);
  const [recetasAlacena, setRecetasAlacena] = useState(null);
  const uid = user.uid;
  //console.log(uid);
  //console.log("alimentos en alacena: ");
  //console.log(alimentosAlacena);
  console.log(subAlacena);
  console.log(alimentosAlacena);


  useEffect(() => {
    fetchAndFilter('recetas', 'Id', user.alacena, setRecetas);
  }, [user.alacena]);

  const hoy = new Date(); // Obtener la fecha actual para saber el día y asignar la rutina
  const dia = hoy.getDay();
  const ejerciciosDeHoy = dia === 0 ? user.domingo :
                          dia === 1 ? user.lunes :
                          dia === 2 ? user.martes :
                          dia === 3 ? user.miercoles :
                          dia === 4 ? user.jueves :
                          dia === 5 ? user.viernes : user.sabado;

useEffect(() => {
  const fetchSubAlacena = async () => {
    try {
      await fetchAndFilterSubcollection('usuarios', uid, 'alacena', null, null, setSubAlacena);
    } catch (error) {
      console.error("Error al obtener y filtrar datos de la subcolección:", error);
    }
  };

  fetchSubAlacena();
}, [actualizarAlacena]);

useEffect(() => {
  const fetchAlimentosAlacena = async () => {
    try {
      const alacenaIds = subAlacena.map(alimento => alimento.alimento);
      await fetchAndFilter('alimentos', 'ID', alacenaIds, setAlimentosAlacena);
    } catch (error) {
      console.error("Error al obtener y filtrar datos:", error);
    }
  };

  if (subAlacena.length > 0) {
    fetchAlimentosAlacena();
  }
}, [subAlacena]);

useEffect(() => {
  const alimentosCombinados = subAlacena.map(alacenaItem => {
    const alimentoItem = alimentosAlacena.find(alimento => alimento.ID === alacenaItem.alimento);
    return {
      ...alacenaItem,
      ...alimentoItem
    };
  });
  
  setAlacena(alimentosCombinados);
}, [alimentosAlacena])




  useEffect(() => {
    fetchAndFilter('ejercicios', 'Id', ejerciciosDeHoy, setRutina);
  }, [ejerciciosDeHoy]);

  return (
    <> 
      <div className='flex w-full'>
        <div className='w-3/12 ring-1 col-span-2'>
          <Requerimientos userInfo={user} />
          <Alimento setVerReceta={setVerReceta} alimentoInfo={alacena} closeAlacena={openAlacena} setCloseAlacena={setOpenAlacena} />
        </div>
        <div className="flex w-9/12 ring-1">
          {openAlacena && !verReceta ? (
            <UpdateAlacena
              uid={uid}
              closeAlacena={openAlacena}
              alimentosAlacena={alimentosAlacena}
              setCloseAlacena={setOpenAlacena}
              actualizarAlacena={actualizarAlacena}
              setActualizarAlacena={setActualizarAlacena}
            />
          ) : verReceta && !openAlacena ? (
            <>
              <div className=" w-8/12 ring-1">
                <Recetas setVerReceta={setVerReceta} recetas={recetas} />
              </div>
              <div className="w-4/12 ring-1">
                <Suenho /> 
                <div>Registro alimenticio</div>
              </div>
            </>
          ) : (
            <>
              <div className="w-8/12 ring-1">
                <Ejercicios ejercicios={rutina} />
              </div>
              <div className="w-4/12 ring-1">
                <Suenho /> 
                <div>Registro alimenticio</div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
