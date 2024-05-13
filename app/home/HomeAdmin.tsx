import React from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import Instalaciones from "../componentes/LandingPage/Instalaciones";
import Servicio from "../componentes/LandingPage/Servicio";
import ListaClientes from '../componentes/Recepcionista/ListaClientes';
import Tienda from '../componentes/Recepcionista/Tienda';

export default function HomeAdmin({user}) {
  return (
    <div className='flex h-full'>
      <div className='w-3/4'>
        <div className="h-auto ring-1 ring-sky-600">Pendientes</div>
        <div className='h-auto ring-1   ring-sky-600 p-1'>
          <TabGroup className="mx-2">
            <TabList >
              <Tab className="text-xs mx-1 p-1 rounded-md bg-gray-500">PRODUCTOS</Tab>
              <Tab className="text-xs p-1 rounded-md bg-gray-500">CLIENTES</Tab>
              <Tab className="text-xs mx-1 p-1 rounded-md bg-gray-500">INTALACIONES</Tab>
              <Tab className="text-xs p-1 rounded-md bg-gray-500">SERVICIOS</Tab>
            </TabList>
            <TabPanels className="mt-2ZZ">
              <TabPanel><Tienda/></TabPanel>
              <TabPanel><ListaClientes/></TabPanel>
              <TabPanel><Instalaciones/></TabPanel>
              <TabPanel><Servicio/></TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
      <div className=' w-1/4 ring-1 ring-sky-600'>
        Reporte eonómico
        inventario de maquinas y equipos
      </div>
    </div>
  )
  
}