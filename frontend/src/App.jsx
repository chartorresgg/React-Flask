import React from 'react';
import UsuarioForm from './components/UsuarioForm.jsx';
import UsuarioList from './components/UsuarioList.jsx';
import DeporteForm from './components/DeporteForm.jsx';
import DeporteList from './components/DeporteList.jsx';


function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Gestión de Usuarios y Deportes</h1>
      <UsuarioForm />
      <UsuarioList />
      <hr />
      <DeporteForm />
      <DeporteList />
    </div>
  );
}

export default App;