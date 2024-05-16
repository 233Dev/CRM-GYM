
export default function HomeTrainer({user}) {
  return (
    <div className='flex h-96 max-h-screen'>
      <div className='w-3/4'>
        <div className="h-2/5 ring-1 ring-sky-600">Pendientes</div>
        <div className='h-3/5 ring-1 ring-sky-600'>Clientes</div>
      </div>
      <div className='w-1/4 ring-1 ring-sky-600'>
        NOTIFICACIONES
      </div>
    </div>
  )
}
