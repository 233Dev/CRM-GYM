// Componente Ejercicios
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Ejercicio from './Ejercicio';

export default function Ejercicios({ejercicios}) {
  const [entrenamientos, setEntrenamientos] = useState(null);
  const [repeticiones, setRepeticiones] = useState(null);
  const [sets, setSets] = useState(null);
  const [peso, setPeso] = useState(null);
  
  const opcionesRepeticiones = [
    { value: '5', label: '5 reps' },
    { value: '6', label: '6 reps' },
    { value: '7', label: '7 reps' },
    { value: '8', label: '8 reps' },
    { value: '10', label: '10 reps' },
    { value: '12', label: '12 reps' },
    { value: '15', label: '15 reps' }
  ];
  const opcionesSets = [
    { value: '3', label: '3 sets' },
    { value: '4', label: '4 sets' },
  ];
  const opcionesPeso = [
    { value: '65', label: '65%' },
    { value: '75', label: '75%' },
    { value: '85', label: '85%' },
  ];

  useEffect(() => {
    if (repeticiones && sets && peso) {
      const nuevosEntrenamientos = ejercicios.map((ejercicio) => {
        return {
          ejercicio: ejercicio.id,
          sets,
          repeticiones,
          peso,
        };
      });
      setEntrenamientos(nuevosEntrenamientos);
    }
  }, [repeticiones, sets, peso, ejercicios]);
  
  
  console.log(entrenamientos);

  return (<>
    <div className='flex'>
      <div className="w-1/3 m-1">
        <Select
          value={sets}
          onChange={(option) => setSets(option)}
          options={opcionesSets}
          placeholder="Sets"
        />
      </div>
      <div className="w-1/3 m-1">
        <Select
          value={repeticiones}
          onChange={(option) => setRepeticiones(option)}
          options={opcionesRepeticiones}
          placeholder="Repeticiones"
        />
      </div>
      <div className="w-1/3 m-1">
        <Select
          value={peso}
          onChange={(option) => setPeso(option)}
          options={opcionesPeso}
          placeholder="Peso"
        />
      </div>
    </div>
      
    <div className="flex flex-wrap justify-center gap-1">
      { ejercicios.map((ejercicio, index) => (
        <Ejercicio key={index} ejercicio={ejercicio} />

      ))}
    </div>
  </>);
}