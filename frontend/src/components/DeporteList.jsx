import React, { useEffect, useState } from 'react';
import DeporteService from '../services/deporteService';
import {
  Grid, Paper, Typography, IconButton, Dialog, DialogTitle, DialogActions,
  Button, DialogContent, DialogContentText
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeporteList({ recargar, onEditarDeporte }) {
  const [deportes, setDeportes] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deporteAEliminar, setDeporteAEliminar] = useState(null);

  useEffect(() => {
    const fetchDeportes = async () => {
      try {
        const data = await DeporteService.getDeportes();
        setDeportes(data);
      } catch (error) {
        console.error('Error al cargar los deportes:', error);
      }
    };

    fetchDeportes();
  }, [recargar]);

  const handleEliminar = async () => {
    await DeporteService.deleteDeporte(deporteAEliminar.id_deporte);
    setDeportes(deportes.filter(d => d.id_deporte !== deporteAEliminar.id_deporte));
    setDialogOpen(false);
    setDeporteAEliminar(null);
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <Typography variant="h5" gutterBottom>Lista de Deportes</Typography>
      <Grid container spacing={2}>
        {deportes.map((deporte) => (
          <Grid item xs={12} sm={6} md={4} key={deporte.id_deporte}>
            <Paper elevation={3} style={{ padding: '16px', position: 'relative' }}>
              <Typography variant="subtitle1">{deporte.nombre_deporte}</Typography>
              <div style={{ position: 'absolute', top: 8, right: 8 }}>
                <IconButton onClick={() => onEditarDeporte(deporte)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => {
                    setDeporteAEliminar(deporte);
                    setDialogOpen(true);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro que deseas eliminar el deporte "{deporteAEliminar?.nombre_deporte}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleEliminar} color="error">Eliminar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}