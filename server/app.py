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

    reviews = ma.Nested("ReviewSchema", many=True)


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

    user = ma.Nested(UserSchema)


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


# def check_for_missing_values(data):
#     errors_list = []

#     for key, value in data.items():
#         if not value:
#             errors_list.append(f"{key} is required")

#     return errors_list


class SignUp(Resource):
    def post(self):
        data = request.get_json()

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        user = User(username=username, email=email)

        user.password_hash = password

        try:
            db.session.add(user)
            db.session.commit()

            session["user_id"] = user.id
            return singular_user_schema.dump(user), 201

        except IntegrityError:
            return {"errors": "Username or password unable to be verified"}, 422


class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")

        user = User.query.filter(User.username == username).first()

        if not user or not user.authenticate(password):
            return {"errors": ["Username or password is incorrect"]}, 401

        session["user_id"] = user.id
        return singular_user_schema.dump(user), 200


class Logout(Resource):
    def delete(self):
        if session.get("user_id"):
            session["user_id"] = None

            return {}, 204

        return {"error": "401 unauthorized"}, 401


class CheckSession(Resource):
    def get(self):
        if session.get("user_id"):
            user = User.query.filter(User.id == session["user_id"]).first()

            return singular_user_schema.dump(user), 200

        return {"error": "401 unauthorized"}, 401


class Dogs(Resource):
    def get(self):
        dogs = Dog.query.all()
        return plural_dog_schema.dump(dogs), 200

    def post(self):
        data = request.get_json()

        name = data.get("name")
        breed = data.get("breed")
        age = data.get("age")
        gender = data.get("gender")
        description = data.get("description")
        image_url = data.get("image_url")

        new_dog = Dog(
            name=name,
            breed=breed,
            age=age,
            gender=gender,
            description=description,
            image_url=image_url,
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


class Adoptions(Resource):
    def get(self):
        adoptions = Adoption.query.all()
        return plural_adoption_schema.dump(adoptions)

    def post(self):
        if "user_id" not in session:
            return {"errors": "User is not authenticated"}, 401

        user_id = session["user_id"]

        data = request.get_json()
        dog_id = data.get("dog_id")

        if not dog_id:
            return {"errors": "dog_id is required"}, 400

        try:
            adoption = Adoption(user_id=user_id, dog_id=dog_id, status="Pending")

            db.session.add(adoption)
            db.session.commit()

            return singular_adoption_schema.dump(adoption), 201

        except IntegrityError:
            db.session.rollback()
            return {"errors": "Unable to process request"}, 422


class Reviews(Resource):
    def get(self, dog_id):
        reviews = Review.query.filter_by(dog_id=dog_id).all()
        return plural_review_schema.dump(reviews)

    def post(self, dog_id):
        if "user_id" not in session:
            return {"errors": "User is not authenticated"}, 401

        user_id = session["user_id"]

        data = request.get_json()

        rating = data.get("rating")
        comment = data.get("comment")

        try:
            new_review = Review(
                user_id=user_id, rating=rating, comment=comment, dog_id=dog_id
            )

            db.session.add(new_review)
            db.session.commit()

            return singular_review_schema.dump(new_review), 201

        except IntegrityError:
            db.session.rollback()
            return {"errors": "Unable to process request."}, 422


api.add_resource(SignUp, "/signup", endpoint="signup")
api.add_resource(Login, "/login", endpoint="login")
api.add_resource(Logout, "/logout", endpoint="logout")
api.add_resource(CheckSession, "/check_session", endpoint="check_session")
api.add_resource(Dogs, "/dogs", endpoint="dogs")
api.add_resource(DogById, "/dogs/<int:id>")
api.add_resource(Adoptions, "/adoptions", endpoint="adoptions")
api.add_resource(Reviews, "/dogs/<int:dog_id>/reviews")


@app.route("/")
def index():
    return "<h1>Project Server</h1>"


if __name__ == "__main__":
    app.run(port=5555, debug=True)
