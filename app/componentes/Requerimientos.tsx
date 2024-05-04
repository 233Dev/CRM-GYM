import Macros from './Macros'


export default function Requerimientos({userInfo}) {

  return (
    <div className='m-4'>
       <div className="w-full rounded-2xl p-4 bg-gray-300 ring-4  ring-gray-900/5">
        <p className="text-base font-bold text-gray-900 underline underline-offset-1 ">Requerimientos diários</p>
        <Macros props={userInfo}/>
      </div>
    </div>
  )
}
