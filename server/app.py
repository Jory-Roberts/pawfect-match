#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, jsonify, make_response, request
from flask_restful import Resource


# Local imports
from config import app, db, api, ma

# Add your model imports
from models import User, Dog, Adoption, Review, Visit


class DogSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Dog
        load_instance = True

    id = ma.auto_field()
    name = ma.auto_field()
    breed = ma.auto_field()
    age = ma.auto_field()
    gender = ma.auto_field()
    description = ma.auto_field()
    image_url = ma.auto_field()


singular_dog_schema = DogSchema()
plural_dog_schema = DogSchema(many=True)


# Views go here!
class Dogs(Resource):
    def get(self):
        dogs = Dog.query.all()
        return plural_dog_schema.dump(dogs), 200

    def post(self):
        data = request.get_json()

        new_dog = Dog(
            name=data.get("name"),
            breed=data.get("breed"),
            age=data.get("age"),
            gender=data.get("gender"),
            description=data.get("description"),
            image_url=data.get("image_url"),
        )

        db.session.add(new_dog)
        db.session.commit()

        response = make_response(singular_dog_schema.dump(new_dog), 201)

        return response


api.add_resource(Dogs, "/dogs")


class DogById(Resource):
    def get(self, id):
        dog = Dog.query.filter_by(id=id).first()

        if not dog:
            return {"error": "Dog not found"}, 404

        return singular_dog_schema.dump(dog), 200

    def patch(self, id):
        dog = Dog.query.filter_by(id=id).first()

        if not dog:
            return {"error": "Dog not found"}, 404

        for attr in request.form:
            setattr(dog, attr, request.form[attr])

        db.session.add(dog)
        db.session.commit()

        response = make_response(singular_dog_schema.dump(dog), 200)

        return response


api.add_resource(DogById, "/dogs/<int:id>")


@app.route("/")
def index():
    return "<h1>Project Server</h1>"


if __name__ == "__main__":
    app.run(port=5555, debug=True)
