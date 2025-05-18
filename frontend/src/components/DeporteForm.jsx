import React, { useEffect, useState } from 'react';
import DeporteService from '../services/deporteService';

export default function DeporteForm({ onDeporteCreado, deporteEditar, limpiarEdicion }) {
  const [deporte, setDeporte] = useState({


    nombre_deporte: '',
  });

  useEffect(() => {
  if (deporteEditar) {
    setDeporte({ ...deporteEditar }); // ✅ Copia del objeto, no referencia directa
  } else {
    setDeporte({ nombre_deporte: '' });
  }
}, [deporteEditar]);


  const handleChange = (e) => {
  const { name, value } = e.target;
  console.log("Cambio detectado:", name, value); // 👀
  setDeporte(prev => ({ ...prev, [name]: value }));
};



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (deporte.id_deporte) {
        await DeporteService.updateDeporte(deporte);
        alert('Deporte actualizado');
        limpiarEdicion();
      } else {
        await DeporteService.createDeporte(deporte);
        alert('Deporte creado');
      }

      setDeporte({ nombre_deporte: '' });
      if (onDeporteCreado){
        onDeporteCreado();
      }
    } catch (error) {
      console.error('Error al crear/actualizar deporte:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <h2>{deporte.id_deporte ? 'Editar Deporte' : 'Agregar Deporte'}</h2>
      <input
        type="text"
        name="nombre_deporte"  // ✅ Necesario para que `handleChange` funcione
        value={deporte.nombre_deporte}
        onChange={handleChange}
        placeholder="Nombre del deporte"
        required
      />
      <button type="submit">
        {deporteEditar ? 'Actualizar' : 'Guardar'}
      </button>
    </form>
  );
}
