from flask import Flask, jsonify, request # Import Flask and other necessary modules
from sqlalchemy import text # Import text to execute raw SQL queries
from typing import Optional # Import Optional for type hinting
from flask_cors import CORS
from sqlalchemy.exc import SQLAlchemyError

# ================== Imports class from Model ====================
from model.Deporte import Deporte
from model.Usuario import Usuario

import database.db as db # Import the database connection and session

# ================== Flask configuration =========================

# Create a Flask application instance
app = Flask(__name__)
CORS(app)  # ✅ Esto habilita CORS para todas las rutas
# ================== Verify database connection ==================
try:
    db.session.execute(text('SELECT 1'))
    print("Conexión exitosa a la base de datos.")
except Exception as e:
    print("Error al conectar a la base de datos:", e)
    exit(1)

# ================== USER CRUD ==================

# Get all users from the database
@app.route('/getUsers', methods=['GET']) # Annotate the route and method
def get_usuarios():

    usuarios = db.session.query(Usuario).all() # Query all users from the database
    usuarios_dict = [u.to_dict() for u in usuarios] # Convert each user to a dictionary

    return jsonify(usuarios_dict), 200

# Create a new user
@app.route('/createUser', methods=['POST'])
def crear_usuario():

    data = request.get_json() # Get the JSON data from the request

    try:
        nuevo_usuario = Usuario(
            id_usuario=data['id_usuario'],
            nombre=data['nombre'],
            correo=data['correo'],
            contraseña=data['contraseña'],
            saldo_disponible=float(data['saldo_disponible'])
        )

        db.session.add(nuevo_usuario) # Add the new user to the session
        db.session.commit() # Commit the session to save the user to the database

        return jsonify({'message': 'Usuario creado', 'id': nuevo_usuario.id_usuario}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Update a user
@app.route('/updateUser', methods=['PUT'])
def actualizar_usuario():

    data = request.get_json()
    id_usuario = data.get('id_usuario')

    if not id_usuario:
        return jsonify({'error': 'El id_usuario es requerido'}), 400

    usuario = db.session.query(Usuario).get(id_usuario)
    if usuario:
        usuario.nombre = data.get('nombre', usuario.nombre)
        usuario.correo = data.get('correo', usuario.correo)
        usuario.contraseña = data.get('contraseña', usuario.contraseña)
        usuario.saldo_disponible = float(data.get('saldo_disponible', usuario.saldo_disponible))

        db.session.commit()

        return jsonify({'message': 'Usuario actualizado'}), 200
    else:
        return jsonify({'error': 'Usuario no encontrado'}), 404

# Delete a user
@app.route('/deleteUser', methods=['DELETE'])
def eliminar_usuario():

    data = request.get_json()
    id_usuario = data.get('id_usuario')

    if not id_usuario:
        return jsonify({'error': 'El id_usuario es requerido'}), 400

    usuario = db.session.query(Usuario).get(id_usuario)
    if usuario:
        db.session.delete(usuario)
        db.session.commit()

        return jsonify({'message': 'Usuario eliminado'}), 200
    else:
        return jsonify({'error': 'Usuario no encontrado'}), 404

# ================= CRUD SPORT ==================

# Get all sports from the database
@app.route('/getSports', methods=['GET'])
def get_deportes():
    try:
        deportes = db.session.query(Deporte).all()
        deportes_dict = [d.to_dict() for d in deportes]
        return jsonify(deportes_dict), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        print("Error en /getSports:", e)
        return jsonify({'error': str(e)}), 500


# Create a new sport
@app.route('/createSport', methods=['POST'])
def crear_deporte():

    data = request.get_json()
    try:
        nuevo_deporte = Deporte(
            id_deporte=data['id_deporte'],
            nombre_deporte=data['nombre_deporte']
        )

        db.session.add(nuevo_deporte)
        db.session.commit()

        return jsonify({'message': 'Deporte creado', 'id': nuevo_deporte.id_deporte}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
# Update a sport
@app.route('/updateSport', methods=['PUT'])
def actualizar_deporte():

    data = request.get_json()
    id_deporte = data.get('id_deporte')

    if not id_deporte:
        return jsonify({'error': 'El id_deporte es requerido'}), 400

    deporte = db.session.query(Deporte).get(id_deporte)

    if deporte:
        deporte.nombre_deporte = data.get('nombre_deporte', deporte.nombre_deporte)
        db.session.commit()

        return jsonify({'message': 'Deporte actualizado'}), 200
    else:
        return jsonify({'error': 'Deporte no encontrado'}), 404

# Delete a sport
@app.route('/deleteSport', methods=['DELETE'])
def eliminar_deporte():

    data = request.get_json()
    id_deporte = data.get('id_deporte')

    if not id_deporte:
        return jsonify({'error': 'El id_deporte es requerido'}), 400

    deporte = db.session.query(Deporte).get(id_deporte)
    if deporte:
        db.session.delete(deporte)
        db.session.commit()

        return jsonify({'message': 'Deporte eliminado'}), 200
    else:
        return jsonify({'error': 'Deporte no encontrado'}), 404


# ================= Main function ==================

# This function is the entry point of the application.
if __name__ == '__main__':
    # Crear las tablas si no existen
    db.Base.metadata.create_all(db.engine)
    app.run(debug=True, port=5000)