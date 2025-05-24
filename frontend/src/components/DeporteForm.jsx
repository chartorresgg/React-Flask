import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
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

    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}
    >
      <Typography variant="h6">
        {deporte.id_deporte ? 'Editar Deporte' : 'Crear Deporte'}
      </Typography>

      <TextField 
        name="nombre_deporte"
        value={deporte.nombre_deporte}
        onChange={handleChange}
        label="Nombre del Deporte"
        required
      />

      <Button type="submit" variant="contained" color="primary">
        {deporte.id_deporte ? 'Actualizar' : 'Crear'}
      </Button>
    </Box>
  
  );
}
