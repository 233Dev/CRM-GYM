import React, { useState, useEffect } from 'react';
import { fetchAndFilter } from "../firebase";
import { XMarkIcon } from '@heroicons/react/24/outline';


export default function IngredientesForm() {
  
  //Metadata receta
  const [nombre, setNombre] = useState(null);
  const [descripcion, setDescripcion] = useState(null);
  const [dificultad, setDificultad] = useState(null);
  const [tiempoPreparacion, setTiempoPreparacion] = useState(null);
  const [tiempoCoccion, setTiempoCoccion] = useState(null);
  const [porciones, setPorciones] = useState(null);
  //Instrucciones (array de pasos ordenados)
  const [instruccioes, setInstrucciones] = useState([{ id: 1, value: '' }]);
  const [nextId, setNextId] = useState(2);
  //Ingredientes
  const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState([]);
  const [cantidad, setCantidad] = useState('');
  const [unidad, setUnidad] = useState('');
  const [ingredienteId, setIngredienteId] = useState('');
  const [ingredientesDisponibles, setIngredientesDisponibles] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      nombre &&
      descripcion &&
      dificultad &&
      tiempoPreparacion > 0 &&
      tiempoCoccion > 0 &&
      porciones > 0 &&
      instruccioes.every(item => item.value.trim() !== '') &&
      ingredientesSeleccionados.length > 0 &&
      ingredientesSeleccionados.every(ingrediente => ingrediente.cantidad > 0)
    ) {
      console.log("Todos los campos están completos y son válidos. Actualizar receta...");
    } else {
      alert("Por favor, completa todos los campos y asegúrate de que los valores numéricos sean mayores que 0.");
    }
  };


  //Instrucciones
  const handleAddItem = () => {
    const newItem = { id: nextId, value: '' };
    setInstrucciones([...instruccioes, newItem]);
    setNextId(nextId + 1);
  };

  const handleChange = (id, value) => {
    const updatedInstruccioes = instruccioes.map(item =>
      item.id === id ? { ...item, value } : item
    );
    setInstrucciones(updatedInstruccioes);
  };

  const handleRemoveItem = (id) => {
    const updatedInstruccioes = instruccioes.filter(item => item.id !== id);
    setInstrucciones(updatedInstruccioes);
  };


  //Ingredientes
  useEffect(() => {
    async function fetchData() {
      await fetchAndFilter('alimentos', null, [], setIngredientesDisponibles);
    }
    fetchData();
  }, []);

  const handleAddIngrediente = () => {
    if (ingredienteId && cantidad && unidad) {
      const ingredienteSeleccionado = ingredientesDisponibles.find(ingrediente => ingrediente.ID === parseInt(ingredienteId));
      if (ingredienteSeleccionado) {
        if (parseFloat(cantidad) <= 0) {
          alert("Por favor, introduce una cantidad válida mayor a 0.");
          return;
        }

        const nuevoIngrediente = { id: ingredienteSeleccionado.ID, cantidad, unidad, nombre: ingredienteSeleccionado.Alimento };
        setIngredientesSeleccionados([...ingredientesSeleccionados, nuevoIngrediente]);
        setIngredienteId('');
        setCantidad('');
        setUnidad('');
      }
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  const handleEliminarIngrediente = (index) => {
    const nuevosIngredientes = [...ingredientesSeleccionados];
    nuevosIngredientes.splice(index, 1);
    setIngredientesSeleccionados(nuevosIngredientes);
  };
  
  const handleCantidadChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setCantidad(value);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <form onSubmit={handleSubmit} className="relative">
        {/** Metadatos */}
        <div className="p-4 bg-opacity-50 rounded-lg text-lg font-semibold mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          <label>
            Nombre:
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full h-auto rounded-t-xl"
            />
          </label>
          <label>
            Descripción:
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full h-auto rounded-t-xl"
            />
          </label>
          <label>
            Dificultad:
            <select
              value={dificultad}
              onChange={(e) => setDificultad(e.target.value)}
              className="w-full h-auto rounded-t-xl"
            >
              <option value="Fácil">Fácil</option>
              <option value="Intermedia">Intermedia</option>
              <option value="Difícil">Difícil</option>
            </select>
          </label>
          <label>
            Tiempo de Preparación (minutos):
            <input
              type="number"
              value={tiempoPreparacion}
              onChange={(e) => setTiempoPreparacion(parseFloat(e.target.value))}
              min="0"
              className="w-full h-auto rounded-t-xl"
            />
          </label>
          <label>
            Tiempo de Cocción (minutos):
            <input
              type="number"
              value={tiempoCoccion}
              onChange={(e) => setTiempoCoccion(parseFloat(e.target.value))}
              min="0"
              className="w-full h-auto rounded-t-xl"
            />
          </label>
          <label>
            Porciones:
            <input
              type="number"
              value={porciones}
              onChange={(e) => setPorciones(parseFloat(e.target.value))}
              min="0"
              className="w-full h-auto rounded-t-xl"
            />
          </label>
        </div>

        {/** Instrucciones */}
        <div className="p-4 bg-opacity-50 rounded-lg text-lg font-semibold mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <label>
            Instrucciones:
            {instruccioes.map((item) => (
              <div key={item.id} className="mt-2">
                <input
                  type="text"
                  value={item.value}
                  onChange={(e) => handleChange(item.id, e.target.value)}
                  className="w-full h-auto rounded-t-xl"
                />
                <button onClick={() => handleRemoveItem(item.id)}>Eliminar</button>
              </div>
            ))}
            <button onClick={handleAddItem}>Agregar Elemento</button>
          </label>
        </div>

        {/** Ingredientes */}
        <div className="p-4 bg-opacity-50 rounded-lg text-lg font-semibold mt-4">
          <label>
            Selecciona un ingrediente:
            <select
              value={ingredienteId}
              onChange={(e) => setIngredienteId(e.target.value)}
              className="w-full h-auto rounded-t-xl"
            >
              <option value="">Selecciona...</option>
              {ingredientesDisponibles.map((ingrediente) => (
                <option key={ingrediente.ID} value={ingrediente.ID}>
                  {ingrediente.Alimento}
                </option>
              ))}
            </select>
          </label>
          <label>
            Cantidad:
            <input
              type="number"
              value={cantidad}
              onChange={handleCantidadChange}
              className="w-full h-auto rounded-t-xl"
            />
          </label>
          <label>
            Unidad:
            <select
              value={unidad}
              onChange={(e) => setUnidad(e.target.value)}
              className="w-full h-auto rounded-t-xl"
            >
              <option value="">Selecciona...</option>
              <option value="gramos">Gramos</option>
              <option value="cucharada">Cucharada</option>
              <option value="taza">Taza</option>
              <option value="rebanadas">Rebanadas</option>
              {/* Otras unidades */}
            </select>
          </label>
          <button type="button" onClick={handleAddIngrediente}>Agregar Ingrediente</button>

          <h2 className="mt-4">Ingredientes Seleccionados:</h2>
          <ul>
            {ingredientesSeleccionados.map((ingrediente, index) => (
              <li key={ingrediente.id}>
                {ingrediente.cantidad} {ingrediente.unidad} de {ingrediente.nombre}
                <button
                  type="button"
                  onClick={() => handleEliminarIngrediente(index)}
                  className="ml-2"
                >
                  <XMarkIcon className="w-6 h-6 text-gray-500 hover:text-gray-700" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button type="submit" className="absolute top-0 right-0 p-4 bg-opacity-50 rounded-lg text-lg font-semibold">Actualizar Receta</button>
      </form>
    </div>
  );
}

