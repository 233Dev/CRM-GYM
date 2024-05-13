import {useState} from "react";
import Tienda from "../componentes/Recepcionista/Tienda";
import ListaClientes from '../componentes/Recepcionista/ListaClientes';
import Carrito from '../componentes/Recepcionista/Carrito'; // Asegúrate de ajustar la ruta si es necesario
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';



export default function HomeReception({ user }) {
  const [productosEnCarrito, setProductosEnCarrito] = useState([]);

  return (
    <div className='flex w-full'>
      <div className='w-3/4 ring-1 col-span-2'>
        <TabGroup>
          <TabList className=" items-center ">
            <Tab className="m-2 p-2 rounded-md bg-gray-500">Tienda</Tab>
            <Tab className="m-2 p-2 rounded-md bg-gray-500">Clientes</Tab>
          </TabList>
          <TabPanels>
            <TabPanel><Tienda setProductosEnCarrito={setProductosEnCarrito} productosEnCarrito={productosEnCarrito} /></TabPanel>
            <TabPanel><ListaClientes setProductosEnCarrito={setProductosEnCarrito} productosEnCarrito={productosEnCarrito} /></TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
      <div className='w-1/4 ring-1 col-span-1'>
        <Carrito productosEnCarrito={productosEnCarrito} />
      </div>
    </div>
  )
}