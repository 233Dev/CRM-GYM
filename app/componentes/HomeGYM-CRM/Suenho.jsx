import React from 'react'

export default function Suenho() {
  return (
        <div className="m-2 flex justify-center rounded-xl p-2 bg-gray-500 py2" style={{ backgroundImage: "url('https://reasons-prod.storage.googleapis.com/wp-content/uploads/2021/09/shutterstock_1420779497-2048x983.jpg')", backgroundSize: 'cover' }}>
            <span className='flex-wrap mr-1'>
              <label>inicio</label>   
              <input type="time"/>
            </span>
            <span className='flex-wrap ml-1'>
              <label>fin</label>
              <input type="time"/>
            </span>
            
        </div>
  )
}