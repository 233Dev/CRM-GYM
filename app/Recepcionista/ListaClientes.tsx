"use client";
import React, { useState, useEffect } from 'react';
import { getAllDocumentIds, getDocumentInfo, updateDocument } from '../firebase';


// Función para obtener el color de la membresía
const colorMembresia = (membresia) => {
  switch (membresia) {
    case 'Pagada':
      return 'bg-green-200';
    case 'Vencida':
      return 'bg-red-200';
    case 'Proximo a vencer':
      return 'bg-yellow-200';
    default:
      return 'bg-gray-200';
  }
};

export default function Home() {
  const [editingCliente, setEditingCliente] = useState(null); // Cliente en proceso de edición
  const [clientes, setClientes] = useState([]); // Estado para almacenar los datos de Firebase
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    telefono: '',
    membresia: ''
  });

  useEffect(() => {
    async function fetchData() {
      const documentIds = await getAllDocumentIds('ArrEglO');
      const clienteData = await Promise.all(documentIds.map(async (docId) => {
        const cliente = await getDocumentInfo('ArrEglO', docId);
        cliente.id = docId;
        return cliente
      }));
      setClientes(clienteData);
      
    }
    fetchData();
    console.log(clientes);
  }, []);

  const handleEdit = (cliente) => {
    setEditingCliente(cliente);
    setFormData({
      nombre: cliente.nombre,
      edad: cliente.edad,
      telefono: cliente.telefono,
      membresia: cliente.membresia
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre, edad, telefono, membresia } = formData;
    const newData = { nombre, edad, telefono, membresia };
    await updateDocument('ArrEglO', editingCliente.id, newData);
    // Actualizar el estado de clientes después de la edición
    const updatedClientes = clientes.map(cliente => {
      if (cliente.id === editingCliente.id) {
        return { ...cliente, ...newData };
      }
      return cliente;
    });
    setClientes(updatedClientes);
    // Limpiar el formulario y el estado de edición
    setFormData({
      nombre: '',
      edad: '',
      telefono: '',
      membresia: ''
    });
    setEditingCliente(null);
  };

  return (
    <div className="ring-1 border border-gray-300 rounded-2xl overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="p-2">Membresía</th>
            <th className="p-2">Nombre</th>
            <th className="p-2">Teléfono</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id} className="bg-gray-200">
              <td className={`p-2 ${colorMembresia(cliente.membresia)}`}>{cliente.membresia}</td>
              <td className="p-2">{cliente.nombre}</td>
              <td className="p-2">{cliente.telefono}</td>
              <td className="p-2">
                <button onClick={() => handleEdit(cliente)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">Editar</button>
                <button onClick={() => handleDelete(cliente.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingCliente && (
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4">Editar Cliente</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <p>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                  Nombre:
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </p>
              <p>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edad">
                  edad:
                </label>
                <input
                  type="text"
                  id="edad"
                  name="edad"
                  value={formData.edad}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </p>
              <p>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
                  telefono:
                </label>
                <input
                  type="number"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </p>
              <p>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="membresia">
                  membresia:
                </label>
                <select
                  id="membresia"
                  name="membresia"
                  value={formData.membresia}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Membresía</option>
                  <option value="Pagada">Pagada</option>
                  <option value="Vencida">Vencida</option>
                  <option value="Proximo a vencer">Por vencer</option>
                </select>
              </p>
            </div>
            {/* Aquí agregar campos adicionales (edad, telefono, membresia) del formulario */}
            <div className="mb-4">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">Guardar</button>
              <button onClick={() => setEditingCliente(null)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancelar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}