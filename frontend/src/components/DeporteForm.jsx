// src/components/DeporteForm.jsx
import { useState } from 'react'
import { createDeporte } from '../services/deporteService'

export default function DeporteForm({ onDeporteCreado }) {
  const [nombre, setNombre] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!nombre.trim()) return

    try {
      const nuevoDeporte = await createDeporte({ nombre })
      onDeporteCreado(nuevoDeporte)
      setNombre('')
    } catch (error) {
      console.error('Error al crear deporte:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Agregar Deporte</h3>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre del deporte"
      />
      <button type="submit">Guardar</button>
    </form>
  )
}
