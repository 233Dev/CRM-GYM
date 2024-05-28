"use client";
import React, { useState, useEffect } from 'react';
import { auth, updateDocument, getDocumentInfo } from "../firebase";
import { Timestamp } from "firebase/firestore";

export default function Register({ user, setRefresh, refresh }) {
    const [formData, setFormData] = useState({
        nombre: '',
        telefono: '',
        nacimiento: '',
        rol: 1,
        altura: '',
        peso: '',
        sexo: true, // true para masculino
    });

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                const userInfo = await getDocumentInfo('usuarios', user.uid);
                if (userInfo) {
                    setFormData({
                        nombre: userInfo.nombre || '',
                        telefono: userInfo.telefono || '',
                        nacimiento: userInfo.nacimiento ? userInfo.nacimiento.toDate().toISOString().split('T')[0] : '',
                        rol: 1, // Valor predeterminado
                        altura: userInfo.altura || '',
                        peso: userInfo.peso || '',
                        sexo: userInfo.sexo === undefined ? userInfo.sexo : true, // Valor predeterminado masculino
                    });
                }
            }
        };
        fetchUserData();
    }, [user]);

    const handleChange = (e) => { 
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === "sexo" ? (value === "true" ? true : false) : value // Convertir sexo a booleano correctamente
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = {
            ...formData,
            nacimiento: formData.nacimiento ? Timestamp.fromDate(new Date(formData.nacimiento)) : null,
        };
        await updateDocument('usuarios', user.uid, updatedData);
        setRefresh(!refresh);
    };

    const maxDate = new Date().toISOString().split("T")[0]; // Fecha máxima permitida (hoy)

    return (
        <div>
            <div className="p-4">
                <h2 className="text-lg font-bold mb-4">Completar Registro</h2>
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
                            <input
                                type="hidden"
                                id="rol"
                                name="rol"
                                value={1}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </p>
                        <p>
                            <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="telefono">
                                Teléfono:
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
                            <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="nacimiento">
                                Fecha de Nacimiento:
                            </label>
                            <input
                                type="date"
                                id="nacimiento"
                                name="nacimiento"
                                value={formData.nacimiento}
                                onChange={handleChange}
                                max={maxDate}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </p>
                        <p>
                            <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="altura">
                                Altura (cm):
                            </label>
                            <input
                                type="number"
                                id="altura"
                                name="altura"
                                value={formData.altura}
                                min="0"
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </p>
                        <p>
                            <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="peso">
                                Peso (kg):
                            </label>
                            <input
                                type="number"
                                id="peso"
                                name="peso"
                                value={formData.peso}
                                min="0"
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </p>
                        <p>
                            <label className="block text-gray-900 text-sm font-bold mb-2" htmlFor="sexo">
                                Sexo:
                            </label>
                            <select
                                id="sexo"
                                name="sexo"
                                value={formData.sexo ? "true" : "false"}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="true">Masculino</option>
                                <option value="false">Femenino</option>
                            </select>
                        </p>
                    </div>
                    <div className="mb-4">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">
                            Guardar
                        </button>
                        <button type="button" onClick={() => setFormData({
                            nombre: '',
                            telefono: '',
                            nacimiento: '',
                            rol: 1,
                            altura: '',
                            peso: '',
                            sexo: true,
                        })} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
