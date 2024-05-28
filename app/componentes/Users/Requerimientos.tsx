import Macros from './Macros';

const test = "2024-05-13 01:46:00.123";

export default function Requerimientos({ userInfo }) {
  const millisecondTimestamp = (userInfo.nacimiento.seconds * 999) + userInfo.nacimiento.nanoseconds;//[la formula dice que debería multiplicarse por 1000 pero da desface, multiplicar por 999 reduce el desface a 1 día]
  const birthDate = new Date(millisecondTimestamp); // Convertir la cadena a un objeto de fecha
  //console.log("Fecha de nacimiento: "+birthDate);//aprox 10 días de desface al futuro xd
  const ageInYears = (Date.now() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25); // Calcular edad en años
  //console.log("Edad en años: "+ageInYears);
  const TMB = 10 * userInfo.peso + 6.25 * userInfo.altura - 5 * ageInYears + (userInfo.sexo ? 5 : -161);    //Fórmula Mifflin-St Jeor: Hombres: 10 x Peso (kg) + 6.25 x Altura (cm) - 5 x Edad (años) + 5; Mujeres: 10 x Peso (kg) + 6.25 x Altura (cm) - 5 x Edad (años) - 161;
  //console.log("10 * "+userInfo.peso+"+ 6.25 * "+userInfo.altura+" - 5 * "+ageInYears+"+5:-161");
  //console.log("Tasa meabólica basal: "+TMB);

  return (
    <div className='m-4'>
       <div className="w-full rounded-2xl p-4 bg-gray-300 ring-4  ring-gray-900/5">
        <p className="text-base font-bold text-gray-900 underline underline-offset-1 ">Requerimientos diários</p>
        <Macros props={userInfo} />
      </div>
    </div>
  )
}

