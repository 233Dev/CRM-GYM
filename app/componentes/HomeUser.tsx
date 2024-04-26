import React from 'react'

export default function HomeUser({user}) {

  console.log(user);

  return (
    <div>
      {user ? (
        <div>
          <p>Bienvenido, {user.displayName}</p>
          <p>Email: {user.email}</p>
          <p>ID: {user.uid}</p>
          {/* Agrega aquí cualquier otra información del usuario que desees mostrar */}
        </div>
      ) : (
        <p>No estás autenticado.</p>
      )}
    </div>
  )
}