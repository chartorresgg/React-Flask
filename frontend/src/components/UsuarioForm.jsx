import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, Card, CardContent } from '@mui/material';
import UsuarioService from '../services/usuarioService';

export default function UsuarioForm({ onUsuarioCreado, usuarioEditar, limpiarEdicion }) {
  const [usuario, setUsuario] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    saldo_disponible: 0,
  });

  useEffect(() => {
    setUsuario(usuarioEditar ? { ...usuarioEditar } : {
      nombre: '',
      correo: '',
      contraseña: '',
      saldo_disponible: 0,
    });
  }, [usuarioEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (usuario.id_usuario) {
        await UsuarioService.actualizarUsuario(usuario.id_usuario, usuario);
        alert('Usuario actualizado');
        limpiarEdicion();
      } else {
        await UsuarioService.crearUsuario(usuario);
        alert('Usuario creado');
      }
      setUsuario({ nombre: '', correo: '', contraseña: '', saldo_disponible: 0 });
      if (onUsuarioCreado) onUsuarioCreado();
    } catch (error) {
      console.error('Error al crear/actualizar usuario:', error);
    }
  };

  return (
    <Card sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h6" align="center" gutterBottom>
          {usuario.id_usuario ? 'Editar Usuario' : 'Crear Usuario'}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            name="nombre"
            label="Nombre"
            value={usuario.nombre}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            name="correo"
            label="Correo"
            type="email"
            value={usuario.correo}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            name="contraseña"
            label="Contraseña"
            type="password"
            value={usuario.contraseña}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            name="saldo_disponible"
            label="Saldo disponible"
            type="number"
            value={usuario.saldo_disponible}
            onChange={handleChange}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {usuario.id_usuario ? 'Actualizar' : 'Crear'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
