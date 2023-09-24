#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, jsonify, make_response, request
from flask_restful import Resource


# Local imports
from config import app, db, api

# Add your model imports
from models import User, Dog, Adoption, Review, Visit


# Views go here!
class Dogs(Resource):
    def get(self):
        dogs = [dog.to_dict() for dog in Dog.query.all()]

        return make_response(jsonify(dogs), 200)


api.add_resource(Dogs, "/dogs")


@app.route("/")
def index():
    return "<h1>Project Server</h1>"


if __name__ == "__main__":
    app.run(port=5555, debug=True)
