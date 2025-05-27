# PoliApuestas - Sistema de Gestión de Usuarios y Deportes

## Descripción General

PoliApuestas es una aplicación web desarrollada como proyecto académico que permite la gestión de usuarios y deportes. El sistema está dividido en dos componentes principales:

- **Backend** desarrollado con **Python**, **Flask** y **SQLAlchemy**.
- **Frontend** desarrollado con **React**, **Vite** y **Material UI**.

La arquitectura sigue un modelo cliente-servidor que se comunica mediante una API REST.

---

## Tecnologías Utilizadas

### Backend

- **Lenguaje:** Python 3.12
- **Framework:** Flask
- **ORM:** SQLAlchemy
- **Base de Datos:** MySQL
- **Entornos:** VS Code + PowerShell
- **Estructura del Proyecto:**

  - `app.py`: Archivo principal para correr la aplicación Flask.
  - `config.py`: Configuración de base de datos y claves.
  - `model/`: Contiene las clases `Usuario` y `Deporte` como modelos.
  - `services/`: Contiene la lógica CRUD para `usuario_service.py` y `deporte_service.py`.
  - `routes/`: Define las rutas REST para `/usuario` y `/deporte`.

### Frontend

- **Lenguaje:** JavaScript
- **Librerías principales:** React 19, ReactDOM
- **Herramientas:** Vite, Material UI, ESLint
- **Componentes:**

  - `App.jsx`: Componente principal donde se integran formularios y listas.
  - `components/`: Contiene formularios y listas para usuarios y deportes.
  - `services/`: Maneja la comunicación con la API para usuarios y deportes.

---

## Objetivo del Proyecto

Desarrollar un sistema completo de gestión que permita:

- Crear, listar, editar y eliminar **usuarios** con los campos: nombre, correo, contraseña y saldo.
- Crear, listar, editar y eliminar **deportes** con el campo: nombre del deporte.
- Gestionar la interfaz gráfica con validaciones, confirmaciones y retroalimentación al usuario.

---

## Estructura de la API REST

### Endpoints - Usuario

- `GET /usuario` - Obtener todos los usuarios
- `GET /usuario/<id>` - Obtener un usuario por ID
- `POST /usuario` - Crear un nuevo usuario
- `PUT /usuario/<id>` - Actualizar un usuario existente
- `DELETE /usuario/<id>` - Eliminar un usuario

### Endpoints - Deporte

- `GET /deporte` - Obtener todos los deportes
- `GET /deporte/<id>` - Obtener un deporte por ID
- `POST /deporte` - Crear un nuevo deporte
- `PUT /deporte/<id>` - Actualizar un deporte existente
- `DELETE /deporte/<id>` - Eliminar un deporte

---

## Instalación y Ejecución

### Backend

1. Clonar el repositorio.
2. Crear un entorno virtual:

   ```bash
   python -m venv venv
   source venv/bin/activate  # o .\venv\Scripts\activate en Windows
   ```

3. Instalar dependencias:

   ```bash
   pip install -r requirements.txt
   ```

4. Configurar la base de datos en `config.py`.
5. Ejecutar la aplicación:

   ```bash
   python app.py
   ```

### Frontend

1. Navegar al directorio `frontend/`.
2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Ejecutar la aplicación:

   ```bash
   npm run dev
   ```

---

## Funcionalidades Destacadas

- Formulario reactivo con validaciones.
- Mensajes de confirmación antes de eliminar.
- Separación de responsabilidades mediante servicios.
- Recarga automática de listas tras operaciones CRUD.

---

## Consideraciones Finales

Este proyecto sirve como base para futuras ampliaciones como:

- Asociación entre usuarios y deportes.
- Autenticación y autorización de usuarios.
- Implementación de microservicios y contenedores Docker.

---

## Autores

- Proyecto desarrollado para la asignatura **Desarrollo de Aplicaciones Web**.
- Autor: \[Nombre del estudiante o grupo] (completar según se requiera).

---

## Licencia

Este proyecto es de uso educativo. Puede ser modificado y reutilizado con fines de aprendizaje.
