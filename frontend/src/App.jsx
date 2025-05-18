// src/App.jsx
import React, { useEffect, useState } from 'react';
import UsuarioForm from './components/UsuarioForm';
import UsuarioList from './components/UsuarioList';
import DeporteForm from './components/DeporteForm';
import DeporteList from './components/DeporteList';

function App() {

  const [recargarUsuarios, setRecargarUsuarios] = useState(false);
  const [recargarDeportes, setRecargarDeportes] = useState(false);

useEffect(() => {
  const delay = setTimeout(() => {
    setRecargarDeportes(true);
  }, 500); // Espera medio segundo

  return () => clearTimeout(delay);
}, []);

  const handleUsuarioCreado = () => {
    setRecargarUsuarios(prev => !prev);
  };

  const handleDeporteCreado = () => {
    setRecargarDeportes(prev => !prev);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Gestión de Usuarios y Deportes</h1>

      <UsuarioForm onUsuarioCreado={handleUsuarioCreado} />
      <UsuarioList recargar={recargarUsuarios} />

      <hr />

      <DeporteForm onDeporteCreado={handleDeporteCreado} />
      <DeporteList recargar={recargarDeportes} />
    </div>
  );
}

export default App;