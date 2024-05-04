import React from 'react'

export default function Suenho() {
  return (
    <div className="m-2 items-center rounded-xl p-2" style={{ backgroundImage: "url('https://reasons-prod.storage.googleapis.com/wp-content/uploads/2021/09/shutterstock_1420779497-2048x983.jpg')", backgroundSize: 'cover' }}>
      <div className='justify-between items-center'>
        <span className='mr-1'>
          <label>inicio</label>   
          <input type="time"/>
        </span>
        <span className='ml-1'>
          <label>fin</label>
          <input type="time"/>
        </span>
      </div>
      <div><button className='bg-gray-400 text-gray-950 rounded-md mt-2 p-2 opacity-50'> test </button></div>
      
    </div>
        
  )
}