// src/App.jsx
import React, { useEffect, useState } from 'react';
import UsuarioForm from './components/UsuarioForm';
import UsuarioList from './components/UsuarioList';
import DeporteForm from './components/DeporteForm';
import DeporteList from './components/DeporteList';

function App() {

  const [recargarUsuarios, setRecargarUsuarios] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState(null);
  const [recargarDeportes, setRecargarDeportes] = useState(false);
  const [deporteEditar, setDeporteEditar] = useState(null);

useEffect(() => {
  const delay = setTimeout(() => {
    setRecargarDeportes(true);
  }, 500); // Espera medio segundo

  return () => clearTimeout(delay);
}, []);

  const handleUsuarioCreado = () => {
    setRecargarUsuarios(prev => !prev);
    setUsuarioEditar(null); // limpiar edición al terminar
  };

  const handleDeporteCreado = () => {
    setRecargarDeportes(prev => !prev);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Gestión de Usuarios y Deportes</h1>

      <UsuarioForm 
      onUsuarioCreado={handleUsuarioCreado} 
      usuarioEditar={usuarioEditar}
        limpiarEdicion={() => setUsuarioEditar(null)}
      
      
      />
      <UsuarioList recargar={recargarUsuarios}
      onEditarUsuario={(u) => setUsuarioEditar(u)} />

      <hr />

     <DeporteForm
  onDeporteCreado={handleDeporteCreado}
  deporteEditar={deporteEditar}
  limpiarEdicion={() => setDeporteEditar(null)}
/>

<DeporteList
  recargar={recargarDeportes}
  onEditarDeporte={(d) => setDeporteEditar(d)}
/>
    </div>
  );
}

export default App;