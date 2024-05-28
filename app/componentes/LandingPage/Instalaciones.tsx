import React, { useState, useEffect } from 'react';
import { fetchAndFilter, uploadImageToStorage, updateDocument } from '../../firebase';

export default function Instalaciones({ user }) {
  const [imagen1, setImagen1] = useState(null);
  const [imagen2, setImagen2] = useState(null);
  const [imagen3, setImagen3] = useState(null);
  const [nameImagen1, setNameImagen1] = useState(null);
  const [nameImagen2, setNameImagen2] = useState(null);
  const [nameImagen3, setNameImagen3] = useState(null);
  const [servicios, setServicios] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null); // Estado para controlar la actualización de imágenes

  useEffect(() => {
    async function fetchData() {
      await fetchAndFilter('servicios', 'id', 'instalaciones', setServicios);
    }
    fetchData();
  }, [uploadedImage]); 
  const instalaciones = servicios[0]; //console.log(servicios);

  useEffect(() => {
    if (instalaciones) {
      setNameImagen1(instalaciones.imagen1);
      setNameImagen2(instalaciones.imagen2);
      setNameImagen3(instalaciones.imagen3);
    }
  }, [instalaciones]);

  const handleImageUpload = async (imagen, setImagen, folderName, imageURLField) => {
    try {
      if (!imagen) {
        console.error('No se ha seleccionado ninguna imagen.');
        return;
      }

      // Generar un nombre único para la imagen
      const imageName = `${Date.now()}_${imagen.name}`;
      const downloadURL = await uploadImageToStorage(imagen, folderName, imageName);

      // Crear el objeto con el campo que se desea actualizar
      const dataToUpdate = { [imageURLField]: downloadURL };

      // Actualizar solo el campo específico en Firestore
      await updateDocument('servicios', 'instalaciones', dataToUpdate);

      // Limpiar el estado después de subir la imagen
      setImagen(null);

      // Actualizar el estado para que se vuelvan a cargar las imágenes
      setUploadedImage(Date.now());

      console.log('Imagen subida y URL actualizada en Firestore');
    } catch (error) {
      console.error('Error al subir la imagen o actualizar la URL en Firestore:', error);
    }
  };

  return (
    <>
    <div className="relative border-2 border-gray-100 rounded-2xl overflow-hidden m-1">
      <div className="flex">
        <div className="relative w-1/3 h-auto overflow-hidden">
          <img className="h-full object-cover" src={nameImagen1} alt="Imagen 1" />
        </div>
        <div className="relative w-1/3 h-auto overflow-hidden">
          <img className="h-full" src={nameImagen2} alt="Imagen 2" />
        </div>
        <div className="relative w-1/3 h-auto overflow-hidden">
          <img className="h-full" src={nameImagen3} alt="Imagen 3" />
        </div>
      </div>
    </div>

      {user && user.rol === 4 && (
        <div className="flex mt-4">
          <div className="relative w-1/3 h-auto overflow-hidden">
            <input type="file" onChange={(e) => setImagen1(e.target.files[0])} />
            <button onClick={() => handleImageUpload(imagen1, setImagen1, 'instalaciones', 'imagen1')} className="text-xs mx-1 p-1 rounded-md bg-green-500">Subir Imagen 1</button>
          </div>
          <div className="relative w-1/3 h-auto overflow-hidden">
            <input type="file" onChange={(e) => setImagen2(e.target.files[0])} />
            <button onClick={() => handleImageUpload(imagen2, setImagen2, 'instalaciones', 'imagen2')} className="text-xs mx-1 p-1 rounded-md bg-green-500">Subir Imagen 2</button>
          </div>
          <div className="relative w-1/3 h-auto overflow-hidden">
            <input type="file" onChange={(e) => setImagen3(e.target.files[0])} />
            <button onClick={() => handleImageUpload(imagen3, setImagen3, 'instalaciones', 'imagen3')} className="text-xs mx-1 p-1 rounded-md bg-green-500">Subir Imagen 3</button>
          </div>
        </div>
      )}
    </>
  );
}