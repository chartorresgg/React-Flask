import React, { useEffect, useState } from 'react';
import UsuarioService from '../services/usuarioService';

export default function UsuarioList({ recargar, onEditarUsuario  }) {
  const [usuarios, setUsuarios] = useState([]);

 useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const data = await UsuarioService.getAllUsuarios();
        setUsuarios(data);
      } catch (error) {
        console.error('Error al cargar los usuarios:', error);
      }
    };

    cargarUsuarios();
  }, [recargar]);

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Lista de Usuarios</h2>
      <ul>
        {usuarios.map((u) => (
          <li key={u.id_usuario}>
            {u.nombre} - {u.correo} - ${u.saldo_disponible}
            <button onClick={() => onEditarUsuario(u)} style={{ marginLeft: '10px' }}>
              Editar
            </button>

            <button
  onClick={async () => {
    if (confirm(`¿Estás seguro de eliminar a ${u.nombre}?`)) {
      await UsuarioService.eliminarUsuario(u.id_usuario);
      setUsuarios(usuarios.filter(user => user.id_usuario !== u.id_usuario));
    }
  }}
  style={{ marginLeft: '10px', color: 'red' }}
>
  Eliminar
</button>

          </li>
        ))}
      </ul>
    </div>
  );
}
