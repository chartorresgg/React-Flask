import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import UsuarioService from '../services/usuarioService';

export default function UsuarioForm({ onUsuarioCreado, usuarioEditar, limpiarEdicion }) {
  const [usuario, setUsuario] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    saldo_disponible: 0,
  });

useEffect(() => {
    if (usuarioEditar) {
      setUsuario(usuarioEditar);
    }
  }, [usuarioEditar]);

  const handleChange = (e) =>
    setUsuario({ ...usuario, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (usuario.id_usuario) {
        await UsuarioService.actualizarUsuario(usuario.id_usuario, usuario);
        alert('Usuario actualizado');
        limpiarEdicion(); // salir del modo edición
      } else {
        await UsuarioService.crearUsuario(usuario);
        alert('Usuario creado');
      }

      setUsuario({ nombre: '', correo: '', contraseña: '', saldo_disponible: 0 });

      if (onUsuarioCreado) {
        onUsuarioCreado();
      }
    } catch (error) {
      console.error('Error al crear/actualizar usuario:', error);
    }
  };

    return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}
    >
      <Typography variant="h6">
        {usuario.id_usuario ? 'Editar Usuario' : 'Crear Usuario'}
      </Typography>

      <TextField
        name="nombre"
        value={usuario.nombre}
        onChange={handleChange}
        label="Nombre"
        required
      />
      <TextField
        name="correo"
        value={usuario.correo}
        onChange={handleChange}
        label="Correo"
        type="email"
        required
      />
      <TextField
        name="contraseña"
        type="password"
        value={usuario.contraseña}
        onChange={handleChange}
        label="Contraseña"
        required
      />
      <TextField
        name="saldo_disponible"
        value={usuario.saldo_disponible}
        onChange={handleChange}
        label="Saldo disponible"
        type="number"
      />
      <Button variant="contained" type="submit" color="primary">
        {usuario.id_usuario ? 'Actualizar' : 'Crear'}
      </Button>
    </Box>
  );
}