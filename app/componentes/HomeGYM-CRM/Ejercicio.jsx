import React from 'react';
import { Disclosure } from '@headlessui/react';

export default function Ejercicio({ ejercicio }) {
  return (
    <div className="w-5/12 bg-white shadow-md rounded-lg p-4 max-h-96 overflow-y-auto">
      {/* Título */}
      <h2 className="text-xl font-bold mb-2">{ejercicio.nombre}</h2>
      
      {/* Imagen */}
      <img src={ejercicio.imagen} alt={ejercicio.nombre} className="h-auto rounded-lg mb-2" />
  
      {/* Detalles del ejercicio */}
      <div className="text-xs">
        <p><span className="font-semibold">Grupos Musculares:</span> {ejercicio.gruposMusculares.join(', ')}</p>
        <p><span className="font-semibold">Dificultad:</span> {ejercicio.dificultad}</p>
        <p><span className="font-semibold">Equipos:</span> {ejercicio.equipos}</p>
        <p className='mb-3 mt-1'>
        <Disclosure>
          {({ open }) => (
            /* Use the `open` state to conditionally change the direction of an icon. */
            <>
              <Disclosure.Button>
                <span className="p-1 bg-sky-500 rounded-full">Posición Inicial</span>
              </Disclosure.Button>
              <Disclosure.Panel>{ejercicio.posicionInicial}</Disclosure.Panel>
            </>
          )}
        </Disclosure>
        </p>
        <p className=' mb-1'>
        <Disclosure>
          {({ open }) => (
            /* Use the `open` state to conditionally change the direction of an icon. */
            <>
              <Disclosure.Button>
              <span className="p-1 bg-sky-500 rounded-full">Ejecución</span>
              </Disclosure.Button>
              <Disclosure.Panel>{ejercicio.ejecucion}</Disclosure.Panel>
            </>
          )}
        </Disclosure>
        </p>
        <p><span className="font-semibold">Tipo de Ejercicio:</span> {ejercicio.tipoDeEjercicio}</p>
      </div>
    </div>
  );
}
