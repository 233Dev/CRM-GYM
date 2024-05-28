"use client";
import React, { useState, useEffect } from 'react';
import { fetchAndFilter, manageSubcollectionDocument } from "../firebase";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import Suenho from '../componentes/Users/Suenho';
import Requerimientos from '../componentes/Users/Requerimientos';
import Alimento from '../componentes/Users/Alimento';
import Ejercicios from '../componentes/Users/Ejercicios';
import Recetas from '../componentes/Users/Recetas';
import Alacena from '../componentes/Users/Alacena';
import UpdateAlacena from '../componentes/Users/UpdateAlacena';

{/**HOME CLIENTE */}
export default function page({user}) {
  const [alimentosAlacena, setAlimentosAlacena] = useState(null);
  const [openAlacena, setOpenAlacena] = useState(false);
  const [actualizarAlacena, setActualizarAlacena] = useState(false);
  const [rutina, setRutina] = useState([]);
  const [recetas, setRecetas] = useState(null);
  const [verReceta, setVerReceta] = useState(false);
  const [recetasAlacena, setRecetasAlacena] = useState(null);
  const uid = user.uid;
    
    useEffect(() => {
      fetchAndFilter('recetas', 'Id', user.alacena, setRecetas);
    }, [user.alacena]);

  const hoy = new Date();// Obtener la fecha actual para saber el día y asignar la rutina
  const dia = hoy.getDay();
  const ejerciciosDeHoy = dia===0 ? user.domingo :
                          dia===1 ? user.lunes :
                          dia===2 ? user.martes :
                          dia===3 ? user.miercoles :
                          dia===4 ? user.jueves :
                          dia===5 ? user.viernes : user.sabado;
      
  /*useEffect(() => {
    const fetchDocumentData = async () => {
      if (user.uid) {
        const documentData = await manageSubcollectionDocument('usuarios', user.uid, 'alacena', null);
        documentData ? console.log("hay DATA: "+ {documentData}) : console.log("no hay DATA.");
        //const vacio = documentData?.length.toString();
        //vacio==="0" ? setAlimentosAlacena(false):setAlimentosAlacena(documentData);
      }else{
        setAlimentosAlacena(false);
        console.log("ejecutado no");
      }
    };
    fetchDocumentData();
  }, [actualizarAlacena]);*/

  useEffect(() => {
    fetchAndFilter('ejercicios', 'Id', ejerciciosDeHoy, setRutina);
  }, [ejerciciosDeHoy]);

  return (
    <> 
    <div className='flex w-full'>

      <div className='w-3/12 ring-1 col-span-2'>
        <Requerimientos userInfo={user}/>
        <Alimento setVerReceta={setVerReceta} alimentoInfo={alimentosAlacena} closeAlacena={openAlacena} setCloseAlacena={ setOpenAlacena}/>
      </div>

     





      <div className="flex w-9/12 ring-1">
        {openAlacena && !verReceta ? <UpdateAlacena uid={uid} closeAlacena={openAlacena} alimentosAlacena={alimentosAlacena} setCloseAlacena={ setOpenAlacena} setAlimentosAlacena={setAlimentosAlacena} setActualizarAlacena={setActualizarAlacena}/>:
         verReceta && !openAlacena ? (<>
                                      <div className=" w-8/12 ring-1">
                                        <Recetas setVerReceta={setVerReceta} recetas={recetas}/>
                                      </div>
                                      <div className="w-4/12 ring-1">
                                        <Suenho /> 
                                        <div>Registro alimenticio</div>
                                      </div>
                                     </>):
                                     (<>
                                      <div className="w-8/12 ring-1">
                                        <Ejercicios ejercicios={rutina}/>
                                      </div>
                                      <div className="w-4/12 ring-1">
                                        <Suenho /> 
                                        <div>Registro alimenticio</div>
                                      </div>
                                     </>)}
      
      </div>
    </div>
    </>
  )
}