import React, { useState, useEffect } from 'react';
import { uploadArrayToFirestore, fetchAndFilter, uploadImageToStorage, updateDocument } from '../../firebase';

export default function SubirServicio({ setActualizarServicios, actualizarServicios }) {
  const [nombre, setNombre] = useState('');
  const [id, setId] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [costo, setCosto] = useState('');
  const [imagenFile, setImagenFile] = useState(null);
  const [clientes, setClientes] = useState([]); // Estado para almacenar los datos de Firebase

  useEffect(() => {
    async function fetchData() {
      await fetchAndFilter('usuarios', null, [], setClientes);
    }
    fetchData();
  }, []);

  useEffect(() => {
    // Establecer el ID automáticamente basado en el tamaño del arreglo de clientes
    setId(clientes.length.toString());
  }, [clientes]);

  const handleUpload = async () => {
    try {
      let imageURL = '';
      if (imagenFile) {
        imageURL = await uploadImageToStorage(imagenFile, 'servicios', `${id}_imagen`);
        console.log('URL de imagen subida:', imageURL);
      }
      const servicio = { nombre, id, costo, imagen: imageURL };
      await updateDocument('servicios', id, servicio);
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
        readOnly // Hacer que este campo sea de solo lectura
      />
      <input
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
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
