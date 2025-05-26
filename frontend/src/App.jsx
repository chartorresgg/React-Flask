import React, { useEffect, useState } from 'react';
import { Container, Typography, Divider, Box } from '@mui/material';
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
    }, 500);
    return () => clearTimeout(delay);
  }, []);

  const handleUsuarioCreado = () => {
    setRecargarUsuarios(prev => !prev);
    setUsuarioEditar(null);
  };

  const handleDeporteCreado = () => {
    setRecargarDeportes(prev => !prev);
    setDeporteEditar(null);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
        Gestión de Usuarios y Deportes
      </Typography>

      {/* Sección de Usuarios */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h5" gutterBottom>Usuarios</Typography>
        <UsuarioForm
          onUsuarioCreado={handleUsuarioCreado}
          usuarioEditar={usuarioEditar}
          limpiarEdicion={() => setUsuarioEditar(null)}
        />
        <UsuarioList
          recargar={recargarUsuarios}
          onEditarUsuario={(u) => setUsuarioEditar(u)}
        />
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Sección de Deportes */}
      <Box sx={{ my: 4 }}>
        <Typography variant="h5" gutterBottom>Deportes</Typography>
        <DeporteForm
          onDeporteCreado={handleDeporteCreado}
          deporteEditar={deporteEditar}
          limpiarEdicion={() => setDeporteEditar(null)}
        />
        <DeporteList
          recargar={recargarDeportes}
          onEditarDeporte={(d) => setDeporteEditar(d)}
        />
      </Box>
    </Container>
  );
}

export default App;