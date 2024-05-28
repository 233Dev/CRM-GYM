import React from 'react'
import Receta from "./Receta";
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function Recetas({ setVerReceta, recetas }) {
  const recetario = () => {
    setVerReceta(false);
  };

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold">Recetas</h2>
      <button onClick={()=>recetario()}>
        <XMarkIcon className="w-6 h-6 text-gray-500 hover:text-gray-700" />
      </button>
    </div>
  );
}












