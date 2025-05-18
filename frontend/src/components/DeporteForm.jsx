// src/components/DeporteForm.jsx
import React, { useState } from 'react';
import { createDeporte } from '../services/deporteService';

export default function DeporteForm({ onDeporteCreado }) {
  const [nombre_deporte, setNombre] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre_deporte.trim()) return;

    try {
      const nuevoDeporte = await createDeporte({ nombre_deporte });
      setNombre('');
      alert('Deporte creado');

      if (onDeporteCreado) {
        onDeporteCreado(nuevoDeporte); // notifica al padre
      }
    } catch (error) {
      console.error('Error al crear deporte:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <h2>Agregar Deporte</h2>
      <input
        type="text"
        value={nombre_deporte}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre del deporte"
        required
      />
      <button type="submit">Guardar</button>
    </form>
  );
}
