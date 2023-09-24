from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

from config import db, bcrypt


# Models go here!
class User(db.Model):
    __tablename__ = "user"

    # serialize_rules = ("-__password_hash",)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    __password_hash = db.Column(db.String)
    email = db.Column(db.String, unique=True, nullable=False)
    admin = db.Column(db.String, default=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now())

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes may not be viewed")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self.__password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self.__password_hash, password.encode("utf-8")
        )

    def __repr__(self):
        return (
            f"\n<User: username={self.username} email={self.email} admin={self.admin}>"
        )


class Dog(db.Model):
    __tablename__ = "dog"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    breed = db.Column(db.String(50))
    age = db.Column(db.Integer)
    gender = db.Column(db.String(10))
    description = db.Column(db.String(500))
    image_url = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now())

    def __repr__(self):
        return (
            f"<Dog:\n"
            f" name={self.name}\n"
            f" breed={self.breed}\n"
            f" age={self.age}\n"
            f" gender={self.gender}\n"
            f" description={self.description}\n"
            f" image={self.image_url}>"
        )


class Adoption(db.Model):
    __tablename__ = "adoption"

    # serialize_rules = (
    #     "-user.adoptions",
    #     "-dog.adoptions",
    # )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    dog_id = db.Column(db.Integer, db.ForeignKey("dog.id"), nullable=False)
    adoption_date = db.Column(db.DateTime, server_default=db.func.now())
    status = db.Column(db.String(50), default="Pending")

    user = db.relationship("User", backref="adoptions")
    dog = db.relationship("Dog", backref="adoptions")

    def __repr__(self):
        return f"<Adoption:\n" f" Date: {self.adoption_date}\n>"


class Review(db.Model):
    __tablename__ = "review"

    # serialize_rules = (
    #     "-user.reviews",
    #     "-dog.reviews",
    # )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    dog_id = db.Column(db.Integer, db.ForeignKey("dog.id"), nullable=False)
    rating = db.Column(db.Integer)
    comment = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now())

    user = db.relationship("User", backref="reviews")
    dog = db.relationship("Dog", backref="reviews")

    def __repr__(self):
        return f"<Review: \n" f"Rating: {self.rating}\n" f"Comment: {self.comment}>,"


class Visit(db.Model):
    __tablename__ = "visit"

    # serialize_rules = ("-user.visits", "-dog.visits")

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    dog_id = db.Column(db.Integer, db.ForeignKey("dog.id"), nullable=False)
    scheduled_date = db.Column(db.DateTime, server_default=db.func.now())
    visit_status = db.Column(db.String(50))

    user = db.relationship("User", backref="visits")
    dog = db.relationship("Dog", backref="visits")

    def __repr__(self):
        return (
            f"<Visit: \n"
            f"Scheduled Date={self.scheduled_date} \n"
            f"Status={self.visit_status}"
        )
