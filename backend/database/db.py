import mysql.connector
from sqlalchemy import create_engine # This is used to create a connection to the database.
from sqlalchemy.ext.declarative import declarative_base # This is used to create a base class for the models.
from sqlalchemy.orm import sessionmaker # This is used to create a session to interact with the database.

# This class is used to create a connection to the database and manage sessions.
# It uses SQLAlchemy to interact with the database.
# SQLAlchemy is an ORM (Object Relational Mapper) that allows you to interact with databases using Python objects.

connection_string = "mysql+mysqlconnector://root:Thommy1945*@localhost:3306/poli_apuestas"
engine = create_engine(connection_string, echo=True, pool_pre_ping=True) # This creates a connection to the database. The echo=True parameter will log all the SQL statements that are

SessionLocal  = sessionmaker(autocommit=False, autoflush=False, bind=engine) # This creates a session factory that will be used to create sessions.

# This is the base class for the models. All models should inherit from this class.
Base = declarative_base()