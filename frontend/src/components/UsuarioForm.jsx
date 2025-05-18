// src/components/UsuarioForm.jsx
import React, { useState } from 'react';
import UsuarioService from '../services/usuarioService';

export default function UsuarioForm({ onUsuarioCreado }) {
  const [usuario, setUsuario] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    saldo_disponible: 0,
  });

  const handleChange = (e) =>
    setUsuario({ ...usuario, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const nuevoUsuario = await UsuarioService.crearUsuario(usuario);
      alert('Usuario creado');
      setUsuario({ nombre: '', correo: '', contraseña: '', saldo_disponible: 0 });

      if (onUsuarioCreado) {
        onUsuarioCreado(nuevoUsuario); // notifica al padre
      }
    } catch (error) {
      console.error('Error al crear usuario:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <h2>Crear Usuario</h2>
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
      <button type="submit">Crear</button>
    </form>
  );
}
