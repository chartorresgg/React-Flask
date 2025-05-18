
from sqlalchemy import Column, Integer, String, Float # Import the necessary types for the columns
from database.db import Base # Base class for the models

# This class represents the 'deporte' table in the database.
class Deporte(Base):
    __tablename__ = 'deporte' # Table name in the database

    # Define the columns of the table
    id_deporte = Column(Integer, primary_key=True)
    nombre_deporte = Column(String(100), nullable=False)

    # Constructor to initialize the object
    def __init__(self, nombre_deporte):
        self.nombre_deporte = nombre_deporte

    # Method to represent the object as a string
    def __repr__(self):
        return f"<Deporte(nombre_deporte='{self.nombre_deporte}')>"
    
    # Method to convert the object Deport, to a dictionary and return it in a format that can be easily converted to JSON
    def to_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}