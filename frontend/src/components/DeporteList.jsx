// src/components/DeporteList.jsx
import React, { useEffect, useState } from 'react';
import { getDeportes } from '../services/deporteService';

export default function DeporteList({ recargar }) {
  const [deportes, setDeportes] = useState([]);

  useEffect(() => {
    const fetchDeportes = async () => {
      try {
        const data = await getDeportes();
        setDeportes(data);
      } catch (error) {
        console.error('Error al cargar deportes:', error);
      }
    };

    fetchDeportes();
  }, [recargar]); // solo recarga si cambia la prop

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Lista de Deportes</h2>
      <ul>
        {deportes.map((deporte) => (
          <li key={deporte.id}>{deporte.nombre}</li>
        ))}
      </ul>
    </div>
  );
}
