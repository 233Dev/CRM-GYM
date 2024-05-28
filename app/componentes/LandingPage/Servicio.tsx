import React, { useState, useEffect } from 'react';
import { uploadArrayToFirestore, uploadImageToStorage, fetchAndFilter } from '../../firebase';

export default function Servicios({ user, actualizarServicios }) {
  const [nombre, setNombre] = useState('');
  const [id, setId] = useState('');
  const [costo, setCosto] = useState('');
  const [imagenFile, setImagenFile] = useState(null);
  const [servicios, setServicios] = useState([]);
  const [instalaciones, setInstalaciones] = useState([]);
  const [serviciosFiltrados, setServiciosFiltrados] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await fetchAndFilter('servicios', null, [], setServicios);
    }
    fetchData();

    async function fetchInstalaciones() {
      await fetchAndFilter('servicios', 'id', 'instalaciones', setInstalaciones);
    }
    fetchInstalaciones();
  }, [actualizarServicios]);

  useEffect(() => {
    setServiciosFiltrados(
      servicios.filter(
        (servicio) => !instalaciones.some((instalacion) => instalacion.id === servicio.id)
      )
    );
  }, [servicios, instalaciones]);

  const handleUpload = async () => { //si borro esto me da un error en el debugmode
    try {
      let imageURL = '';
      if (imagenFile) {
        imageURL = await uploadImageToStorage(imagenFile, 'servicios', `${id}_imagen`);
        console.log('URL de imagen subida:', imageURL);
      }
      const servicio = { nombre, id, costo, imagen: imageURL }; // es este el error?
      await uploadArrayToFirestore([servicio], 'servicios');
    } catch (error) {
      console.error('Error al subir datos:', error);
    }
  };

  return (
    <>
      <div className="flex">
        {serviciosFiltrados.length > 0 ? (
          serviciosFiltrados.map((servicio) => (
            <div
              key={servicio.id}
              className="bg-gray-400 bg-opacity-40 mx-1 border-2 w-auto justify-center border-s-700 rounded-2xl text-center"
            >
              <center>
                <img className="rounded-t-lg h-80" src={servicio.imagen} alt={servicio.nombre} />
              </center>
              <div className="px-6 py-4">
                <div className="text-gray-300 font-bold text-xl mb-2">{servicio.nombre}</div>
                <p className="text-gray-300 text-base">
                  Este es el texto de la tarjeta. Aquí pondremos la descripción del servicio, dejabajo irá el precio.
                </p>
              </div>
            </div>
          ))
        ) : (
          <div>Aún no has subido algún servicio</div>
        )}
      </div>
    </>
  );
}
