import React, { useState, useEffect } from 'react';
import { fetchAndFilter, updateDocument } from '../../firebase';


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

export default function ListaClientes({ setProductosEnCarrito, productosEnCarrito }) {
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
      await fetchAndFilter('usuarios', null, [], setClientes);
    }
    fetchData();
  }, []);

  const agregarAlCarrito = (producto) => {
    setProductosEnCarrito([...productosEnCarrito, producto]);
  };

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
    await updateDocument('usuarios', editingCliente.id, newData);
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
      <table className="w-full bg-gray-200 bg-opacity-40 ">
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
            <tr key={cliente.id} >
              <td className={`p-2 ${colorMembresia(cliente.membresia)}`}>
                {cliente.membresia == 'Vencida' || 'Proximo a vencer' ? 
                  <button onClick={() => agregarAlCarrito([cliente.uid, cliente.membresia])}>{cliente.membresia}</button> :
                  cliente.membresia}
              </td>
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
                <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="nombre">
                  Nombre:
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </p>
              <p>
                <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="edad">
                  edad:
                </label>
                <input
                  type="number"
                  id="edad"
                  name="edad"
                  value={formData.edad}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </p>
              <p>
                <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="telefono">
                  telefono:
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </p>
              <p>
                <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="membresia">
                  membresia:
                </label>
                <select
                  id="membresia"
                  name="membresia"
                  value={formData.membresia}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
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

















{/*import React, { useState } from 'react';
import { uploadArrayToFirestore, uploadImageToStorage } from '../../firebase';

export default function SubirServicio({ setActualizarServicios, actualizarServicios }) {
  const [nombre, setNombre] = useState('');
  const [id, setId] = useState('');
  const [costo, setCosto] = useState('');
  const [imagenFile, setImagenFile] = useState(null);

  const handleUpload = async () => {
    try {
      let imageURL = '';
      if (imagenFile) {
        imageURL = await uploadImageToStorage(imagenFile, 'servicios', `${id}_imagen`);
        console.log('URL de imagen subida:', imageURL);
      }
      const servicio = { nombre, id, costo, imagen: imageURL };
      await uploadArrayToFirestore([servicio], 'servicios');
      setActualizarServicios(!actualizarServicios);
      console.log(actualizarServicios);
    } catch (error) {
      console.error('Error al subir datos:', error);
    }
  };

  return (
      <div>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="number"
          placeholder="Costo"
          value={costo}
          onChange={(e) => setCosto(e.target.value)}
        />
        <input type="file" onChange={(e) => setImagenFile(e.target.files[0])} />
        <button onClick={handleUpload}>Subir Servicio</button>
      </div>
  );
}
*/}