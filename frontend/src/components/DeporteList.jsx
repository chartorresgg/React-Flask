import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import DeporteService from '../services/deporteService';
import {
  Grid, Card, CardContent, Typography, IconButton, Dialog, DialogTitle,
  DialogActions, Button, DialogContent, DialogContentText
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
    <>
      <Typography variant="h5" align="center" sx={{ my: 4 }}>Lista de Deportes</Typography>
      <Grid container spacing={3}>
        {deportes.map((deporte) => (
          <Grid item xs={12} sm={6} md={4} key={deporte.id_deporte}>
            <Card sx={{ p: 2, position: 'relative' }}>
              <CardContent>
                <Typography variant="subtitle1">{deporte.nombre_deporte}</Typography>
                <Box position="absolute" top={8} right={8}>
                  <IconButton onClick={() => onEditarDeporte(deporte)}><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => {
                    setDeporteAEliminar(deporte);
                    setDialogOpen(true);
                  }}><DeleteIcon /></IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Eliminar el deporte "{deporteAEliminar?.nombre_deporte}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleEliminar} color="error">Eliminar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
