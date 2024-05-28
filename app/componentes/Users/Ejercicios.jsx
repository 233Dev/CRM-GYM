// Componente Ejercicios
import React, { useEffect, useState } from 'react';
import { Radio, RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import Select from 'react-select';
import Ejercicio from './Ejercicio';

const plans = [
  { name: 'Startup', ram: 'altoRendimiento.png', link: "https://headlessui.com/react/radio-group"},
  { name: 'Business', ram: 'volumen.png', link: "https://www.youtube.com/watch?v=_L2vJEb6lVE&list=RDtvTRZJ-4EyI&index=27"},
]

export default function Ejercicios({ejercicios}) {
  const [entrenamientos, setEntrenamientos] = useState(null);
  const [repeticiones, setRepeticiones] = useState(null);
  const [sets, setSets] = useState(null);
  const [peso, setPeso] = useState(null);
  const [selected, setSelected] = useState(plans[0]);
  //console.log(selected);

  
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
  
  
  //console.log(entrenamientos);

  return (<>
    <div >
      <div className="mx-auto w-auto max-w-md ">
        <RadioGroup by="name" value={selected} onChange={setSelected} aria-label="Server size">
          <div className='flex justify-center'>
            {plans.map((plan) => (
              <Radio
                key={plan.name}
                value={plan}
                className="group relative flex cursor-pointer rounded-lg bg-lime-500 py-4 px-5 text-white shadow-md transition focus:outline-none data-[focus]:outline-1
              data-[focus]:outline-white  data-[checked]:bg-green-400  "
              >
                <img className='h-12 w-12' src={plan.ram} alt="" />
                <CheckCircleIcon className="size-6 fill-white opacity-0 transition group-data-[checked]:opacity-100" />
              </Radio>
            ))}
          </div>
        </RadioGroup>
      </div>
      <div className='flex'>
        <div className=" m-1">
          <Select
            value={sets}
            onChange={(option) => setSets(option)}
            options={opcionesSets}
            placeholder="Sets"
          />
        </div>
        <div className=" m-1">
          <Select
            value={repeticiones}
            onChange={(option) => setRepeticiones(option)}
            options={opcionesRepeticiones}
            placeholder="Repeticiones"
          />
        </div>
        <div className=" m-1">
          <Select
            value={peso}
            onChange={(option) => setPeso(option)}
            options={opcionesPeso}
            placeholder="Peso"
          />
        </div>
      </div>
      
    </div>
      
    <div className="flex flex-wrap justify-center gap-1">
      { ejercicios.map((ejercicio, index) => (
        <Ejercicio key={index} ejercicio={ejercicio} />

      ))}
    </div>
  </>);
}