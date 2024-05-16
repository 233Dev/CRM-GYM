import Macros from './Macros';

const test = "2024-05-13 01:46:00.123";

export default function Requerimientos({ userInfo }) {
  const birthDate = new Date(userInfo.nacimiento); // Convertir la cadena a un objeto de fecha
  const ageInYears = (Date.now() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25); // Calcular edad en años
  const TMB = 10 * userInfo.peso + 6.25 * userInfo.altura - 5 * ageInYears + (userInfo.sexo ? 5 : -161);    //Fórmula Mifflin-St Jeor: Hombres: 10 x Peso (kg) + 6.25 x Altura (cm) - 5 x Edad (años) + 5; Mujeres: 10 x Peso (kg) + 6.25 x Altura (cm) - 5 x Edad (años) - 161;
  console.log(TMB);

  return (
    <div className='m-4'>
       <div className="w-full rounded-2xl p-4 bg-gray-300 ring-4  ring-gray-900/5">
        <p className="text-base font-bold text-gray-900 underline underline-offset-1 ">Requerimientos diários</p>
        <Macros props={userInfo} />
      </div>
    </div>
  )
}
