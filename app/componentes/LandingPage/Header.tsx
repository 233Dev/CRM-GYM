import React from 'react'

export default function Header() {
  return (
    <div className="shadow-lg shadow-gray-500 flex justify-center text-center items-center" id="Presentacion">
    <div className="w-1/5">
      <img src="../klipartz.com (7).png" alt=""/>
    </div>
    <div className="w-3/5">
      <h1 className="text-7xl pt-8 text-gray-100">OLYMPUS <br/>GYM</h1>
    </div>
    <div className="w-1/5">
      <a href="https://www.youtube.com/shorts/mOUQR-tZDxo">
        <img src="../klipartz.com (7).png" className="transform scale-x-[-1]" alt=""/>
      </a>
    </div>
  </div>
  )
}
