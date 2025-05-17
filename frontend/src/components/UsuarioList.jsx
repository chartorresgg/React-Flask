import React, { useEffect, useState } from 'react';
import UsuarioService from '../services/usuarioService';

export default function UsuarioList() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    UsuarioService.getAllUsuarios().then(setUsuarios);
  }, []);

  return (
    <div>
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
