const API_BASE_URL = 'http://localhost:5000'; // Cambia según dónde esté tu API Flask

const UsuarioService = {
  getAllUsuarios: async () => {
    const res = await fetch(`${API_BASE_URL}/getUsers`);
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await res.json();
    } else {
      const text = await res.text();
      console.error('Error: respuesta no es JSON:', text);
      throw new Error('Respuesta no válida desde el servidor');
    }
  },

  crearUsuario: async (usuario) => {
    const res = await fetch(`${API_BASE_URL}/createUser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario),
    });
    return res.json();
  },

  actualizarUsuario: async (id, usuario) => {
    const usuarioConId = { id_usuario: id, ...usuario };

    const res = await fetch(`${API_BASE_URL}/updateUser`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuarioConId),
    });
    return res.json();
  },

  eliminarUsuario: async (id) => {
    const res = await fetch(`${API_BASE_URL}/deleteUser`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_usuario: id }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error('Error al eliminar el usuario:', error);
      return { error: 'No se pudo eliminar el usuario' };
    }
    return res.json();
  }
};

// Exporta UsuarioService como default o named export:
export default UsuarioService;
