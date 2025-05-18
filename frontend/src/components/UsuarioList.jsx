// src/components/UsuarioList.jsx
import React, { useEffect, useState } from 'react';
import UsuarioService from '../services/usuarioService';

export default function UsuarioList({ recargar }) {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const data = await UsuarioService.getAllUsuarios();
        setUsuarios(data);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      }
    };

    cargarUsuarios();
  }, [recargar]); // solo recarga si 'recargar' cambia

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Lista de Usuarios</h2>
      <ul>
        {usuarios.map((u) => (
          <li key={u.id_usuario}>
            {u.nombre} - {u.correo} - ${u.saldo_disponible}
          </li>
        ))}
      </ul>
    </div>
  );
}
