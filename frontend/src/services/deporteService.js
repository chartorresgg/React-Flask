const API_BASE_URL = 'http://localhost:5000'

export const getDeportes = async () => {
  const res = await fetch(`${API_BASE_URL}/getSports`);
  return res.json();
};

export const createDeporte = async (deporte) => {
  const res = await fetch(`${API_BASE_URL}/createSport`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(deporte),
  });
  return res.json();
};

export const updateDeporte = async (id, deporte) => {
  const deporteConId = { id_deporte: id, ...deporte };
  const res = await fetch(`${API_BASE_URL}/updateSport`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(deporteConId),
  });
  return res.json();
};

export const deleteDeporte = async (id) => {
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
};
