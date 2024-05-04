import React from 'react'

export default function Instalaciones() {
    return(
      <div className="relative border-2 border-gray-100 rounded-2xl overflow-hidden m-1 ">
        <div className="flex">
            <div className="relative w-1/3 h-auto overflow-hidden">
                <img className="h-full object-cover" src="../gym-bancas.png" alt="Imagen 1" />
            </div>
            <div className="relative w-1/3 h-auto overflow-hidden">
                <img className="h-full" src="../gym-maquinas.jpeg" alt="Imagen 2" />
            </div>
            <div className="relative w-1/3 h-auto overflow-hidden">
            <img className="h-full" src="../mancuernas.jpg" alt="Imagen 3" />
            </div>
        </div>
      </div>
    );
    
};