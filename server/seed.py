#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Dog, Adoption, Visit


def seed_dogs():
    dog1 = Dog(
        name="Cheyenne",
        breed="Alaskan Malamute",
        age=5,
        gender="Female",
        description="Goodest Girl",
        image_url="server/seed_images/Alaskanmalamute0b.jpg",
    )
    db.session.add(dog1)


def main():
    fake = Faker()
    with app.app_context():
        Dog.query.delete()

        print("Starting seed...")

        seed_dogs()

        db.session.commit()

        print("Seeding complete...")


if __name__ == "__main__":
    main()

    # Seed code goes here!
