import React, { useEffect, useState } from 'react';
import DeporteService from '../services/deporteService';

export default function DeporteList({ recargar, onEditarDeporte }) {
  const [deportes, setDeportes] = useState([]);

  useEffect(() => {
    const fetchDeportes = async () => {
      try {
        const data = await DeporteService.getDeportes();
        setDeportes(data);
      } catch (error) {
        console.error('Error al cargar los deportes:', error);
      }
    };

    fetchDeportes();
  }, [recargar]);

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Lista de Deportes</h2>
      <ul>
        {deportes.map((deporte) => (
          <li key={deporte.id_deporte}>
            {deporte.nombre_deporte}
            <button onClick={() => onEditarDeporte(deporte)} style={{ marginLeft: '10px' }}>
              Editar
            </button>
<button
  onClick={async () => {
    if (confirm(`¿Eliminar deporte "${deporte.nombre_deporte}"?`)) {
      await DeporteService.deleteDeporte(deporte.id_deporte);
      setDeportes(deportes.filter(d => d.id_deporte !== deporte.id_deporte));
    }
  }}
  style={{ marginLeft: '10px', color: 'red' }}
>
  Eliminar
</button>
            
          </li>
        ))}
      </ul>
    </div>
  );
}
