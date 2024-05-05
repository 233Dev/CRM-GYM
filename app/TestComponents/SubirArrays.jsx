"use client";
import React, { useEffect } from "react";
import { uploadToFirestore } from "../firebase";

export default function page() {
  const arreglo = [
    {
      "ID": 1,
      "Alimento": "Huevo",
      "Peso": 50,
      "Proteína": 6,
      "Calorías": 78,
      "Carbohidratos": 0.6,
      "VitaminasMinerales": ["D", "B12"],
      "Precio": "Accesible"
    },
    {
      "ID": 2,
      "Alimento": "Pollo (pechuga)",
      "Peso": 100,
      "Proteína": 31,
      "Calorías": 165,
      "Carbohidratos": 0,
      "VitaminasMinerales": ["Hierro", "Zinc"],
      "Precio": "Aceptable"
    },
    {
      "ID": 3,
      "Alimento": "Arroz integral",
      "Peso": 50,
      "Proteína": 2,
      "Calorías": 181,
      "Carbohidratos": 39,
      "VitaminasMinerales": ["Magnesio", "Selenio"],
      "Precio": "Bajo"
    },
    {
      "ID": 4,
      "Alimento": "Avena",
      "Peso": 40,
      "Proteína": 5,
      "Calorías": 151,
      "Carbohidratos": 27,
      "VitaminasMinerales": ["Hierro", "Magnesio"],
      "Precio": "Bajo"
    },
    {
      "ID": 5,
      "Alimento": "Atún enlatado",
      "Peso": 50,
      "Proteína": 13,
      "Calorías": 57,
      "Carbohidratos": 0,
      "VitaminasMinerales": ["Omega-3"],
      "Precio": "Accesible"
    },
    {
      "ID": 6,
      "Alimento": "Frijoles",
      "Peso": 100,
      "Proteína": 9,
      "Calorías": 333,
      "Carbohidratos": 60,
      "VitaminasMinerales": ["Fibra", "Potasio"],
      "Precio": "Accesible"
    },
    {
      "ID": 7,
      "Alimento": "Espinacas",
      "Peso": 50,
      "Proteína": 2,
      "Calorías": 7,
      "Carbohidratos": 1,
      "VitaminasMinerales": ["K", "A"],
      "Precio": "Bajo"
    },
    {
      "ID": 8,
      "Alimento": "Manzana",
      "Peso": 150,
      "Proteína": 0,
      "Calorías": 77,
      "Carbohidratos": 20,
      "VitaminasMinerales": ["C", "Fibra"],
      "Precio": "Accesible"
    },
    {
      "ID": 9,
      "Alimento": "Plátano",
      "Peso": 100,
      "Proteína": 1,
      "Calorías": 89,
      "Carbohidratos": 23,
      "VitaminasMinerales": ["Potasio", "B6"],
      "Precio": "Accesible"
    },
    {
      "ID": 10,
      "Alimento": "Zanahoria",
      "Peso": 80,
      "Proteína": 1,
      "Calorías": 35,
      "Carbohidratos": 8,
      "VitaminasMinerales": ["A", "K"],
      "Precio": "Bajo"
    },
    {
      "ID": 11,
      "Alimento": "Yogur griego",
      "Peso": 150,
      "Proteína": 15,
      "Calorías": 100,
      "Carbohidratos": 6,
      "VitaminasMinerales": ["Calcio", "Probióticos"],
      "Precio": "Accesible"
    },
    {
      "ID": 12,
      "Alimento": "Salmón",
      "Peso": 100,
      "Proteína": 20,
      "Calorías": 208,
      "Carbohidratos": 0,
      "VitaminasMinerales": ["Omega-3", "D"],
      "Precio": "Aceptable"
    },
    {
      "ID": 13,
      "Alimento": "Quinoa",
      "Peso": 50,
      "Proteína": 4,
      "Calorías": 222,
      "Carbohidratos": 39,
      "VitaminasMinerales": ["Hierro", "Magnesio"],
      "Precio": "Aceptable"
    },
    {
      "ID": 14,
      "Alimento": "Pavo (pechuga)",
      "Peso": 100,
      "Proteína": 29,
      "Calorías": 135,
      "Carbohidratos": 0,
      "VitaminasMinerales": ["Hierro", "Zinc"],
      "Precio": "Aceptable"
    },
    {
      "ID": 15,
      "Alimento": "Camote",
      "Peso": 100,
      "Proteína": 1,
      "Calorías": 86,
      "Carbohidratos": 20,
      "VitaminasMinerales": ["A", "C"],
      "Precio": "Accesible"
    },
    {
      "ID": 16,
      "Alimento": "Brócoli",
      "Peso": 100,
      "Proteína": 2.5,
      "Calorías": 34,
      "Carbohidratos": 7,
      "VitaminasMinerales": ["C", "K"],
      "Precio": "Accesible"
    },
    {
      "ID": 17,
      "Alimento": "Pan integral",
      "Peso": 50,
      "Proteína": 6,
      "Calorías": 135,
      "Carbohidratos": 25,
      "VitaminasMinerales": ["Hierro", "B"],
      "Precio": "Accesible"
    },
    {
      "ID": 18,
      "Alimento": "Carne molida magra",
      "Peso": 100,
      "Proteína": 25,
      "Calorías": 250,
      "Carbohidratos": 0,
      "VitaminasMinerales": ["Hierro", "B12"],
      "Precio": "Accesible"
    },
    {
      "ID": 19,
      "Alimento": "Garbanzos",
      "Peso": 100,
      "Proteína": 9,
      "Calorías": 164,
      "Carbohidratos": 27,
      "VitaminasMinerales": ["Hierro", "Magnesio"],
      "Precio": "Accesible"
    },
    {
      "ID": 20,
      "Alimento": "Tomate",
      "Peso": 80,
      "Proteína": 1,
      "Calorías": 15,
      "Carbohidratos": 3,
      "VitaminasMinerales": ["C", "Licopeno"],
      "Precio": "Accesible"
    },
    {
      "ID": 21,
      "Alimento": "Leche descremada",
      "Peso": 200,
      "Proteína": 12,
      "Calorías": 80,
      "Carbohidratos": 12,
      "VitaminasMinerales": ["Calcio", "D"],
      "Precio": "Accesible"
    },
    {
      "ID": 22,
      "Alimento": "Pechuga de pavo (jamón)",
      "Peso": 50,
      "Proteína": 12,
      "Calorías": 60,
      "Carbohidratos": 0,
      "VitaminasMinerales": ["B12", "Zinc"],
      "Precio": "Accesible"
    },
    {
      "ID": 23,
      "Alimento": "Lentejas",
      "Peso": 100,
      "Proteína": 9,
      "Calorías": 116,
      "Carbohidratos": 20,
      "VitaminasMinerales": ["Hierro", "Potasio"],
      "Precio": "Accesible"
    },
    {
      "ID": 24,
      "Alimento": "Almendras",
      "Peso": 30,
      "Proteína": 6,
      "Calorías": 164,
      "Carbohidratos": 6,
      "VitaminasMinerales": ["E", "Magnesio"],
      "Precio": "Aceptable"
    },
    {
      "ID": 25,
      "Alimento": "Kiwi",
      "Peso": 100,
      "Proteína": 1,
      "Calorías": 61,
      "Carbohidratos": 15,
      "VitaminasMinerales": ["C", "K"],
      "Precio": "Accesible"
    },
    {
      "ID": 26,
      "Alimento": "Pera",
      "Peso": 150,
      "Proteína": 0,
      "Calorías": 85,
      "Carbohidratos": 22,
      "VitaminasMinerales": ["C", "Fibra"],
      "Precio": "Accesible"
    },
    {
      "ID": 27,
      "Alimento": "Naranja",
      "Peso": 150,
      "Proteína": 2,
      "Calorías": 62,
      "Carbohidratos": 15,
      "VitaminasMinerales": ["C", "Fibra"],
      "Precio": "Accesible"
    },
    {
      "ID": 28,
      "Alimento": "Tofu",
      "Peso": 100,
      "Proteína": 8,
      "Calorías": 76,
      "Carbohidratos": 2,
      "VitaminasMinerales": ["Calcio", "Hierro"],
      "Precio": "Accesible"
    },
    {
      "ID": 29,
      "Alimento": "VACIO",
      "Peso": null,
      "Proteína": null,
      "Calorías": null,
      "Carbohidratos": null,
      "VitaminasMinerales": [" ", " "],
      "Precio": null
    },
    {
      "ID": 30,
      "Alimento": "Queso cottage",
      "Peso": 100,
      "Proteína": 11,
      "Calorías": 98,
      "Carbohidratos": 2,
      "VitaminasMinerales": ["Calcio", "B12"],
      "Precio": "Accesible"
    },
    {
      "ID": 31,
      "Alimento": "Pescado blanco",
      "Peso": 100,
      "Proteína": 18,
      "Calorías": 90,
      "Carbohidratos": 0,
      "VitaminasMinerales": ["Omega-3", "D"],
      "Precio": "Aceptable"
    },
    {
      "ID": 32,
      "Alimento": "VACIO",
      "Peso": null,
      "Proteína": null,
      "Calorías": null,
      "Carbohidratos": null,
      "VitaminasMinerales": ["C", "K"],
      "Precio": "null"
    },
    {
      "ID": 33,
      "Alimento": "Papas",
      "Peso": 150,
      "Proteína": 3,
      "Calorías": 134,
      "Carbohidratos": 31,
      "VitaminasMinerales": ["C", "Potasio"],
      "Precio": "Accesible"
    },
    {
      "ID": 34,
      "Alimento": "VACIO",
      "Peso": null,
      "Proteína": null,
      "Calorías": null,
      "Carbohidratos": null,
      "VitaminasMinerales": [" ", " "],
      "Precio": null
    },
    {
      "ID": 35,
      "Alimento": "Queso ricotta",
      "Peso": 100,
      "Proteína": 11,
      "Calorías": 174,
      "Carbohidratos": 3,
      "VitaminasMinerales": ["Calcio", "B12"],
      "Precio": "Accesible"
    },
    {
      "ID": 36,
      "Alimento": "Chocolate oscuro (70%)",
      "Peso": 30,
      "Proteína": 2,
      "Calorías": 145,
      "Carbohidratos": 12,
      "VitaminasMinerales": ["Hierro", "Magnesio"],
      "Precio": "Accesible"
    },
    {
      "ID": 37,
      "Alimento": "Huevos de codorniz",
      "Peso": 30,
      "Proteína": 3,
      "Calorías": 54,
      "Carbohidratos": 0,
      "VitaminasMinerales": ["B12"],
      "Precio": "Accesible"
    },
    {
      "ID": 38,
      "Alimento": "VACIO",
      "Peso": null,
      "Proteína": null,
      "Calorías": null,
      "Carbohidratos": null,
      "VitaminasMinerales": ["Hierro", "Magnesio"],
      "Precio": null
    },
    {
      "ID": 39,
      "Alimento": "Guisantes",
      "Peso": 100,
      "Proteína": 5,
      "Calorías": 81,
      "Carbohidratos": 14,
      "VitaminasMinerales": ["C", "K"],
      "Precio": "Accesible"
    },
    {
      "ID": 40,
      "Alimento": "Uvas",
      "Peso": 100,
      "Proteína": 1,
      "Calorías": 67,
      "Carbohidratos": 17,
      "VitaminasMinerales": ["C", "K"],
      "Precio": "Accesible"
    }
  ];


  const arrayName = "alimentos";

  function handleClick(){
    uploadToFirestore(arreglo, arrayName);
  };


  

  return <><button className="m-2" onClick={handleClick}>Subir {arrayName}</button></>;
}
