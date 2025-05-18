import React, { useEffect, useState } from 'react';
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
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <h2>{usuario.id_usuario ? 'Editar Usuario' : 'Crear Usuario'}</h2>
      <input
        name="nombre"
        value={usuario.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />
      <input
        name="correo"
        value={usuario.correo}
        onChange={handleChange}
        placeholder="Correo"
        required
      />
      <input
        name="contraseña"
        type="password"
        value={usuario.contraseña}
        onChange={handleChange}
        placeholder="Contraseña"
        required
      />
      <input
        name="saldo_disponible"
        value={usuario.saldo_disponible}
        onChange={handleChange}
        type="number"
        placeholder="Saldo"
      />
      <button type="submit">
        {usuario.id_usuario ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
}