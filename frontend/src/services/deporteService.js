const API_BASE_URL = 'http://localhost:5000'

const DeporteService = {
 getDeportes: async () => {
  const res = await fetch(`${API_BASE_URL}/getSports`);
  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await res.json();
  } else {
    const text = await res.text();
    console.error('Error: respuesta no es JSON:', text);
    throw new Error('Respuesta no válida desde el servidor');
  }
},

createDeporte: async (deporte) => {
  const res = await fetch(`${API_BASE_URL}/createSport`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(deporte),
  });
  return res.json();
},

updateDeporte: async (deporte) => {
  const res = await fetch(`${API_BASE_URL}/updateSport`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(deporte),
  });
  return res.json();
},


deleteDeporte: async (id) => {
  const res = await fetch(`${API_BASE_URL}/deleteSport`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id_deporte: id }),
  });

  if (!res.ok) {
    const error = await res.text();
    console.error('Error al eliminar el deporte:', error);
    return { error: 'No se pudo eliminar el deporte' };
  }
  return res.json();
}
};

export default DeporteService;