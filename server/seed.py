#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Dog, Adoption, Review, Visit


def seed_dogs():
    dogs = []

    d1 = Dog(
        name="Cheyenne",
        breed="Alaskan Malamute",
        age=5,
        gender="Female",
        description="Goodest girl",
        image_url="https://upload.wikimedia.org/wikipedia/commons/1/16/Alaskanmalamute0b.jpg",
    )
    dogs.append(d1)

    d2 = Dog(
        name="Chroizo",
        breed="Dachsund",
        age=2,
        gender="Male",
        description="Short but sweet",
        image_url="https://upload.wikimedia.org/wikipedia/commons/f/f4/MiniDachshund1_wb.jpg",
    )

    dogs.append(d2)

    d3 = Dog(
        name="Raja",
        breed="Australian Shepherd",
        age=3,
        gender="Male",
        description="Hope you like hair!",
        image_url="https://upload.wikimedia.org/wikipedia/commons/d/d4/Australian_Shepherd.jpg",
    )

    dogs.append(d3)

    d4 = Dog(
        name="Fran",
        breed="Pembroke Welsh Corgi",
        age=4,
        gender="Female",
        description="Hi! I'm down here! I need attention!",
        image_url="https://upload.wikimedia.org/wikipedia/commons/b/bf/Pembroke_Welsh_Corgi_600.jpg",
    )

    dogs.append(d4)

    d5 = Dog(
        name="Jake",
        breed="Bernese mountain dog",
        age=9,
        gender="Male",
        description="Prefer cuddles",
        image_url="https://upload.wikimedia.org/wikipedia/commons/0/05/Berne%C5%84ski_pies_pasterski.jpg",
    )

    dogs.append(d5)

    db.session.add_all(dogs)
    db.session.commit()


def seed_users():
    pass


def seed_adoptions():
    pass


def seed_reviews():
    pass


def seed_visits():
    pass


def main():
    fake = Faker()
    with app.app_context():
        Dog.query.delete()
        User.query.delete()

        print("Starting seed...")

        seed_dogs()

        db.session.commit()

        print("Seeding complete...")


if __name__ == "__main__":
    main()

    # Seed code goes here!
