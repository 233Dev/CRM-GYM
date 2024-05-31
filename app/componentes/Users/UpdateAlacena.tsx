import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { fetchAndFilter, createSubcollectionDocument } from '../../firebase';

export default function Alacena({ uid, closeAlacena, setCloseAlacena, alimentosAlacena, actualizarAlacena, setActualizarAlacena }) {
  const [alimentos, setAlimentos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlimento, setSelectedAlimento] = useState(null);
  const [cantidad, setCantidad] = useState('');
  const [unidad, setUnidad] = useState('gramos');
  //console.log("alimentos de alacena");
  //console.log(alimentosAlacena);

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
    setUnidad('gramos');
    setIsModalOpen(false);
    console.log('Modal cerrado');
  };

  const handleAddToAlacena = async (e) => {
    e.preventDefault();
    if (selectedAlimento && cantidad) {
      setIsModalOpen(false);
      await createSubcollectionDocument('usuarios', uid, 'alacena', null, { alimento: selectedAlimento.ID, cantidad, unidad });
      setActualizarAlacena(!actualizarAlacena);
      closeModal();
    }
  };

  return (
    <>
      <div className="mt-8">
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {alimentos.map((alimento) => (
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
            {alimentosAlacena.map((alimento) => (
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
                      Introduce la cantidad para {selectedAlimento?.Alimento}:
                    </p>
                    <input
                      type="number"
                      value={cantidad}
                      onChange={(e) => setCantidad(e.target.value)}
                      className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Cantidad"
                    />
                    <select
                      value={unidad}
                      onChange={(e) => setUnidad(e.target.value)}
                      className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="gramos">Gramos</option>
                      <option value="kilogramos">Kilogramos</option>
                      <option value="litros">Litros</option>
                      <option value="piezas">Piezas</option>
                      <option value="rebanadas">Rebanadas</option>
                    </select>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                      onClick={handleAddToAlacena}
                    >
                      Añadir
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