#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, jsonify, make_response, request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError


# Local imports
from config import app, db, api, ma

# Add your model imports
from models import User, Dog, Adoption, Review, Visit


# Views go here!
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


class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User
        load_instance = True

    id = ma.auto_field()
    username = ma.auto_field()
    email = ma.auto_field()


singular_user_schema = UserSchema()
plural_user_schema = UserSchema(many=True)


class AdoptionSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Adoption
        load_instance = True

    id = ma.auto_field()
    user_id = ma.auto_field()
    dog_id = ma.auto_field()
    adoption_date = ma.auto_field()
    status = ma.auto_field()


singular_adoption_schema = AdoptionSchema()
plural_adoption_schema = AdoptionSchema(many=True)


class ReviewSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Review
        load_instance = True

    id = ma.auto_field()
    user_id = ma.auto_field()
    dog_id = ma.auto_field()
    rating = ma.auto_field()
    comment = ma.auto_field()
    created_at = ma.auto_field()
    updated_at = ma.auto_field()


singular_review_schema = ReviewSchema()
plural_review_schema = ReviewSchema(many=True)


class VisitSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Visit
        load_instance = True

    id = ma.auto_field()
    user_id = ma.auto_field()
    dog_id = ma.auto_field()
    scheduled_date = ma.auto_field()
    visit_status = ma.auto_field()


singular_visit_schema = VisitSchema()
plural_visit_schema = VisitSchema(many=True)


def check_for_missing_values(data):
    errors_list = []

    for key, value in data.items():
        if not value:
            errors_list.append(f"{key} is required")

    return errors_list


class Users(Resource):
    def post(self):
        data = request.get_json()
        errors = check_for_missing_values(data)

        if len(errors) > 0:
            return {"errors": errors}, 422

        user = User(username=data["username"], email=data["email"])

        user.password_hash = data["password"]

        try:
            db.session.add(user)
            db.session.commit()

            session["user_id"] = user.id
            return singular_user_schema.dump(user), 201

        except IntegrityError as e:
            if isinstance(e, (IntegrityError)):
                for error in e.args:
                    if "UNIQUE" in error:
                        errors.append(
                            "Email or username is already registered. Please try again"
                        )

            return {"errors": errors}, 422


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    user = User.query.filter(User.username == data["username"]).first()

    if not user or not user.authenticate(data["password"]):
        return {"errors": ["Username or password is incorrect"]}, 401

    session["user_id"] = user.id
    return singular_user_schema.dump(user), 200


@app.route("/authorized", methods=["POST"])
def authorized():
    user = User.query.filter(User.id == session.get("user_id")).first()
    if user:
        return singular_user_schema.dump(user), 200
    else:
        return ({"errors": ["Unauthorized"]}), 401


@app.route("/logout", methods=["DELETE"])
def logout():
    session["user_id"] = None
    return {}, 204


@app.route("/check-session", methods=["GET"])
def check_session():
    user = User.query.filter(User.username == session.get("username")).first()

    if user:
        return {"username": user.username}, 200
    else:
        return {"message": "Unauthorized"}, 401


class Dogs(Resource):
    def get(self):
        dogs = Dog.query.all()
        return plural_dog_schema.dump(dogs), 200

    def post(self):
        data = request.get_json()

        new_dog = Dog(
            name=data["name"],
            breed=data["breed"],
            age=data["age"],
            gender=data["gender"],
            description=data["description"],
            image_url=data["image_url"],
        )

        db.session.add(new_dog)
        db.session.commit()

        return singular_dog_schema.dump(new_dog), 201


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

        return singular_dog_schema.dump(dog), 200

    def delete(self, id):
        dog = Dog.query.filter_by(id=id).first()

        if not dog:
            return {"error": "Dog not found"}, 404

        db.session.delete(dog)
        db.session.commit()

        return {"message": "dog successfully deleted"}


api.add_resource(Users, "/users")
api.add_resource(Dogs, "/dogs")
api.add_resource(DogById, "/dogs/<int:id>")


@app.route("/")
def index():
    return "<h1>Project Server</h1>"


if __name__ == "__main__":
    app.run(port=5555, debug=True)
