import os
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy import MetaData
from dotenv import load_dotenv


load_dotenv()
app = Flask(__name__)
app.secret_key = os.environ.get("APP_SECRET_KEY")
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False


# Define metadata, instantiate db
metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)

db.init_app(app)

bcrypt = Bcrypt(app)

# Instantiate REST API
api = Api(app)
ma = Marshmallow(app)

# Instantiate CORS
CORS(app)
