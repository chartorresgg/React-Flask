import React, { useEffect, useState } from 'react';
import UsuarioService from '../services/usuarioService';
import {
  Grid, Card, CardContent, Typography, IconButton,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function UsuarioList({ recargar, onEditarUsuario }) {
  const [usuarios, setUsuarios] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);

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

  const handleEliminar = async () => {
    await UsuarioService.eliminarUsuario(usuarioAEliminar.id_usuario);
    setUsuarios(usuarios.filter(user => user.id_usuario !== usuarioAEliminar.id_usuario));
    setDialogOpen(false);
    setUsuarioAEliminar(null);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Lista de Usuarios
      </Typography>
      <Grid container spacing={3}>
        {usuarios.map((u) => (
          <Grid item xs={12} sm={6} md={4} key={u.id_usuario}>
            <Card sx={{ position: 'relative', p: 2 }}>
              <CardContent>
                <Typography variant="subtitle1">{u.nombre}</Typography>
                <Typography variant="body2">{u.correo}</Typography>
                <Typography variant="body2">Saldo: ${u.saldo_disponible}</Typography>
              </CardContent>
              <Box position="absolute" top={8} right={8}>
                <IconButton onClick={() => onEditarUsuario(u)}><EditIcon /></IconButton>
                <IconButton color="error" onClick={() => {
                  setUsuarioAEliminar(u);
                  setDialogOpen(true);
                }}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro que deseas eliminar al usuario "{usuarioAEliminar?.nombre}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleEliminar} color="error">Eliminar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
