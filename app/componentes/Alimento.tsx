import React, {useEffect, useState} from 'react'
import db, {getUserInfo, getDocumentInfo} from "../firebase"


export default function Alimento(alimento) {
  const  [alimentoInfo, setAlimentoInfo] = useState(null);

  useEffect(() => {
    const fetchAlimentoInfo = async () => {
      try {
        const alimentoData = await getDocumentInfo(alimento, "1");
        setAlimentoInfo(alimentoData);
        console.log(alimentoData);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
      fetchAlimentoInfo();
    }, [alimento]);
  
  return (
    <div className="w-auto mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
      <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
        <div className="mx-auto max-w-xs px-8">
          <p className="text-base font-bold text-gray-600"> {alimentoInfo.Nombre} Queso cottage</p>
          <p className="my-4 flex items-baseline justify-center gap-x-2">
            <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">Costo</span>
            <span className="text-5xl font-bold tracking-tight text-gray-900">{alimentoInfo}Bajo</span>
          </p>
          <p className="text-xs leading-5 text-gray-600">
            <span className=""> Peso total por porción  </span>
            <span className="text-xl font-bold tracking-tight text-gray-900">{alimentoInfo}100</span>
            <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">g</span>
          </p>
          <p className="text-xs leading-5 text-gray-600">
            <span className=""> Proteína opr porción  </span>
            <span className="text-xl font-bold tracking-tight text-gray-900">{alimentoInfo}11</span>
            <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">g</span>
          </p>
          <p className="text-xs leading-5 text-gray-600">
            <span className=""> Calorías  </span>
            <span className="text-xl font-bold tracking-tight text-gray-900">{alimentoInfo}98</span>
            <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600"></span>
          </p>
          <p className="text-xs leading-5 text-gray-600">
            <span className=""> Carbohidratos  </span>
            <span className="text-xl font-bold tracking-tight text-gray-900">{alimentoInfo}2</span>
            <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">g</span>
          </p>
          <p className="text-xs leading-5 text-gray-600">
            <span className=""> Vitaminas y minerales  </span>
            <span className="text-xl font-bold tracking-tight text-gray-900">{alimentoInfo}Calcio, B12</span>
            <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">g</span>
          </p>
          <a
            href="#"
            className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Recetas...
          </a>
          
        </div>
      </div>
    </div>
  )
}