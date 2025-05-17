// src/components/DeporteList.jsx
import { useEffect, useState } from 'react'
import { getDeportes } from '../services/deporteService'

export default function DeporteList() {
  const [deportes, setDeportes] = useState([])

  useEffect(() => {
    const fetchDeportes = async () => {
      try {
        const data = await getDeportes()
        setDeportes(data)
      } catch (error) {
        console.error('Error al cargar deportes:', error)
      }
    }

    fetchDeportes()
  }, [])

  return (
    <div>
      <h2>Lista de Deportes</h2>
      <ul>
        {deportes.map((deporte) => (
          <li key={deporte.id}>{deporte.nombre}</li>
        ))}
      </ul>
    </div>
  )
}
