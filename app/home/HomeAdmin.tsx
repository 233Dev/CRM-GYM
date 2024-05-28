import React, {useState} from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import Instalaciones from "../componentes/LandingPage/Instalaciones";
import Servicio from "../componentes/LandingPage/Servicio";
import ListaClientes from '../componentes/Recepcionista/ListaClientes';
import Tienda from '../componentes/Recepcionista/Tienda';
import Carrito from '../componentes/Recepcionista/Carrito';
import SubirServicio from '../componentes/Admin/SubirServicio';

export default function HomeAdmin({user}) {
  const [productosEnCarrito, setProductosEnCarrito] = useState([]);
  const [carritoOnOff, setCarritoOnOff] = useState(0);
  const [actualizarServicios, setActualizarServicios] = useState(true);

  return (
    <div className='flex h-full'>
      <div className='w-3/4'>
        <div className="h-auto ring-1 ring-sky-600">Pendientes</div>
        <div className='h-auto ring-1   ring-sky-600 p-1' style={{
        backgroundImage: "url('pexels-leonardho-1552251.jpg')",
        backgroundSize: "cover",
      }}>
          <TabGroup className="mx-2">
            <TabList>
              <Tab onClick={() => setCarritoOnOff(0)} className="text-xs mx-1 p-1 rounded-md bg-gray-500">PRODUCTOS</Tab>
              <Tab onClick={() => setCarritoOnOff(0)} className="text-xs p-1 rounded-md bg-gray-500">CLIENTES</Tab>
              <Tab onClick={() => setCarritoOnOff(2)} className="text-xs mx-1 p-1 rounded-md bg-gray-500">INSTALACIONES</Tab>
              <Tab onClick={() => setCarritoOnOff(1)} className="text-xs p-1 rounded-md bg-gray-500">SERVICIOS</Tab>
            </TabList>
            <TabPanels className="mt-2">
              <TabPanel><Tienda setProductosEnCarrito={setProductosEnCarrito} productosEnCarrito={productosEnCarrito}/></TabPanel>
              <TabPanel><ListaClientes setProductosEnCarrito={setProductosEnCarrito} productosEnCarrito={productosEnCarrito}/></TabPanel>
              <TabPanel><Instalaciones user={user}/></TabPanel>
              <TabPanel><Servicio user={user} actualizarServicios={actualizarServicios}/></TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
      <div className=' w-1/4 ring-1 ring-sky-600'>
        Reporte eonómico
        inventario de maquinas y equipos
        {carritoOnOff ==0 ? <Carrito productosEnCarrito={productosEnCarrito} />:
         carritoOnOff ==1 ? <SubirServicio setActualizarServicios={setActualizarServicios} actualizarServicios={actualizarServicios}/>: <>aquí otra cosa</> }
      </div>
    </div>
  )
  
}