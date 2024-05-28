import React, { useState, useEffect } from 'react';
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/solid';


export default function Alimento({ alimentoInfo, setVerReceta, closeAlacena, setCloseAlacena}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  //Funciones para el carrusel de alimentos
  const goToPre = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? alimentoInfo.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === alimentoInfo.length - 1 ? 0 : prevIndex + 1));
  };

  const OpenAlacena = () => {
    setCloseAlacena(true);
  };

  const recetario = () => {
    setVerReceta(true);
  };
  //console.log(alimentoInfo);




  return (
    <div className="item-center w-auto mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
      <div className=" rounded-2xl bg-gray-50 py-4 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
        <div>
          <button onClick={goToPre}><ArrowLeftCircleIcon className="mx-auto h-8 w-8 text-gray-300" aria-hidden="true"/></button>
          <button onClick={OpenAlacena} className="items-center mx-auto text-sm h-8 text-gray-300">ALACENA</button>
          <button onClick={goToNext}><ArrowRightCircleIcon className="mx-auto h-8 w-8 text-gray-300" aria-hidden="true" /></button>
        </div>       
        
        <div className="mx-auto max-w-xs px-8">
          {alimentoInfo && (
            <>
            <p className="text-xl font-bold text-gray-600"> {alimentoInfo[currentIndex].Alimento}</p>
            <p className="my-4 flex items-baseline justify-center gap-x-2">
              <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">Costo</span>
              <span className="text-base font-bold tracking-tight text-gray-900">{alimentoInfo[currentIndex].Precio}</span>
            </p>
            <p className="text-xs leading-5 text-gray-600">
              <span className=""> Peso total por porción  </span>
              <span className="text-xl font-bold tracking-tight text-gray-900">{alimentoInfo[currentIndex].Peso}</span>
              <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">g</span>
            </p>
            <p className="text-xs leading-5 text-gray-600">
              <span className=""> Proteína opr porción  </span>
              <span className="text-xl font-bold tracking-tight text-gray-900">{alimentoInfo[currentIndex].Proteína}</span>
              <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">g</span>
            </p>
            <p className="text-xs leading-5 text-gray-600">
              <span className=""> Calorías  </span>
              <span className="text-xl font-bold tracking-tight text-gray-900">{alimentoInfo[currentIndex].Calorías}</span>
              <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600"></span>
            </p>
            <p className="text-xs leading-5 text-gray-600">
              <span className=""> Carbohidratos  </span>
              <span className="text-xl font-bold tracking-tight text-gray-900">{alimentoInfo[currentIndex].Carbohidratos}</span>
              <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">g</span>
            </p>
            <p className="text-xs leading-5 text-gray-600">
              <span className=""> Vitaminas y minerales  </span>
              <span className="text-xl font-bold tracking-tight text-gray-900">{alimentoInfo[currentIndex].VitaminasMinerales}</span>
              <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">g</span>
            </p>
            <button onClick={() => recetario()} className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" aria-hidden="true">Recetas...</button>

            </>
          )}
        </div>
      </div>
    </div>
  );
}