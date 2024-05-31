export async function manageSubcollectionDocument(
  collectionName, 
  documentId, 
  subcollectionName = null, 
  subcollectionDocumentId = null, 
  data = null,
  callId = null // Añade este parámetro
) {
  try {
    console.log(`Call ID: ${callId}, Collection: ${collectionName}, Document: ${documentId}, Subcollection: ${subcollectionName}, SubcollectionDocumentId: ${subcollectionDocumentId}`);
    let docRef;

    if (subcollectionName) {
      if (subcollectionDocumentId) {
        docRef = doc(db, collectionName, documentId, subcollectionName, subcollectionDocumentId);
      } else {
        // Si no se proporciona un ID de documento, crear un nuevo documento con ID generado automáticamente en la subcolección
        const subcollectionRef = collection(db, collectionName, documentId, subcollectionName);
        const newDocRef = await addDoc(subcollectionRef, data || {});
        console.log(`Call ID: ${callId}, Documento creado exitosamente con ID: ${newDocRef.id}`);
        return (await getDoc(newDocRef)).data();
      }
    } else {
      docRef = doc(db, collectionName, documentId);
    }

    if (data) {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, data);
        console.log(`Call ID: ${callId}, Documento actualizado exitosamente`);
      } else {
        await setDoc(docRef, data);
        console.log(`Call ID: ${callId}, Documento creado exitosamente`);
      }

      const updatedDocSnap = await getDoc(docRef);
      return updatedDocSnap.data();
    } else {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.error(`Call ID: ${callId}, El documento no existe`);
        return null;
      }
    }
  } catch (error) {
    console.error(`Call ID: ${callId}, Error al crear o actualizar el documento:`, error);
    return null;
  }
}


//updateAlacna
import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { fetchAndFilter, manageSubcollectionDocument } from '../../firebase';
import { v4 as uuidv4 } from 'uuid'; //no encontré ni donde se instaló, pero verifique que llamo la función en el componente una vez y es la función de firebase la que duplica su acción, sube un dato correcto y el segundo vacío.

export default function Alacena({ uid, closeAlacena, setCloseAlacena, alimentosAlacena, setAlimentosAlacena, setActualizarAlacena }) {
    const [alimentos, setAlimentos] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAlimento, setSelectedAlimento] = useState(null);
    const [cantidad, setCantidad] = useState('');
  
    useEffect(() => {
      fetchAndFilter('alimentos', null, [], setAlimentos);
    }, []);
  
    const openModal = (alimento) => {
      setSelectedAlimento(alimento);
      setIsModalOpen(true);
      console.log('Modal abierto para:', alimento);
    };
  
    const closeModal = () => {
      setSelectedAlimento(null);
      setCantidad('');
      setIsModalOpen(false);
      console.log('Modal cerrado');
    };
  
    const handleAddToAlacena = async (e) => {
      e.preventDefault();
  
      if (selectedAlimento && cantidad) {
        const callId = uuidv4(); // Generar un ID único para esta llamada
        console.log('Call ID:', callId);
  
        // Desactivar el botón para evitar múltiples clics
        setIsModalOpen(false);
  
        console.log('Añadiendo a alacena:', selectedAlimento, 'Cantidad:', cantidad);
        await manageSubcollectionDocument('usuarios', uid, 'alacena', null, { alimento: selectedAlimento.ID, cantidad }, callId);
        
        //setAlimentosAlacena(documentData);
        closeModal();
      }
    };
  
    return (
      <>
        <div className="mt-8">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {alimentos && alimentos.map((alimento) => (
                <li key={alimento.id} className="py-6">
                  <button onClick={() => openModal(alimento)} className="w-full text-left">
                    <p className="text-xl font-bold text-gray-600">{alimento.Alimento}</p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
  
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="flex items-start justify-between">
            Alimentos disponibles en alacena:
          </div>
  
          <div className="mt-8">
            <div className="flow-root">
              {alimentosAlacena && alimentosAlacena.map((alimento) => (
                <p key={alimento.id} className="text-xl font-bold text-gray-600 m-2">{alimento.Alimento}</p>
              ))}
            </div>
          </div>
        </div>
  
        <Transition appear show={isModalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
  
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      Añadir cantidad
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Introduce la cantidad en kg para {selectedAlimento?.Alimento}:
                      </p>
                      <input
                        type="number"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Cantidad en kg"
                      />
                    </div>
  
                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                        onClick={handleAddToAlacena}
                      >
                        Añadir
                      </button>
                      <button
                        type="button"
                        className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-black hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Cancelar
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
  }  




  //HomeUser
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