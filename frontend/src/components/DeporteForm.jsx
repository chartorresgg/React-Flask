import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, Card, CardContent } from '@mui/material';
import DeporteService from '../services/deporteService';

export default function DeporteForm({ onDeporteCreado, deporteEditar, limpiarEdicion }) {
  const [deporte, setDeporte] = useState({ nombre_deporte: '' });

  useEffect(() => {
    setDeporte(deporteEditar ? { ...deporteEditar } : { nombre_deporte: '' });
  }, [deporteEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeporte((prev) => ({ ...prev, [name]: value }));
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
      if (onDeporteCreado) onDeporteCreado();
    } catch (error) {
      console.error('Error al crear/actualizar deporte:', error);
    }
  };

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom align="center">
          {deporte.id_deporte ? 'Editar Deporte' : 'Crear Deporte'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
          <TextField
            name="nombre_deporte"
            label="Nombre del Deporte"
            value={deporte.nombre_deporte}
            onChange={handleChange}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {deporte.id_deporte ? 'Actualizar' : 'Crear'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
