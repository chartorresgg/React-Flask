import React, { useState } from 'react';
import UsuarioService from '../services/usuarioService';

export default function UsuarioForm() {
  const [usuario, setUsuario] = useState({
    nombre: '',
    correo: '',
    saldo_disponible: 0,
  });

  const handleChange = (e) =>
    setUsuario({ ...usuario, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await UsuarioService.crearUsuario(usuario);
    alert('Usuario creado');
    setUsuario({ nombre: '', correo: '', saldo_disponible: 0 });
  };

  return (
    <form onSubmit={handleSubmit}>
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
