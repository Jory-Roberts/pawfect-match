#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Dog, Adoption, Review, Visit

fake = Faker()


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
    return dogs


def seed_users():
    users = []
    for _ in range(50):
        user = User(
            username=fake.unique.user_name(),
            email=fake.unique.email(),
            admin=fake.random_element(elements=[True, False]),
        )
        user.password_hash = fake.password(
            length=10,
            special_chars=True,
            digits=True,
            upper_case=True,
            lower_case=True,
        )
        users.append(user)
    db.session.add_all(users)
    db.session.commit()
    return users


def seed_adoptions(users, dogs):
    adoptions = []
    for _ in range(50):
        adoption = Adoption(
            user_id=fake.random_element(elements=[user.id for user in users]),
            dog_id=fake.random_element(elements=[dog.id for dog in dogs]),
            adoption_date=fake.date_this_decade(),
            status=fake.random_element(elements=["Pending", "Approved", "Rejected"]),
        )
        adoptions.append(adoption)
    db.session.add_all(adoptions)
    db.session.commit()


def seed_reviews(users, dogs):
    reviews = []
    for _ in range(100):
        review = Review(
            user_id=fake.random_element(elements=[user.id for user in users]),
            dog_id=fake.random_element(elements=[dog.id for dog in dogs]),
            rating=fake.random_int(min=1, max=5),
            comment=fake.text(max_nb_chars=250),
        )
        reviews.append(review)
    db.session.add_all(reviews)
    db.session.commit()


def seed_visits(users, dogs):
    visits = []
    for _ in range(75):
        visit = Visit(
            user_id=fake.random_element(elements=[user.id for user in users]),
            dog_id=fake.random_element(elements=[dog.id for dog in dogs]),
            scheduled_date=fake.date_time_this_month(),
            visit_status=fake.random_element(
                elements=["Scheduled", "Visited", "Cancelled"]
            ),
        )
        visits.append(visit)
    db.session.add_all(visits)
    db.session.commit()
    return visits


def main():
    fake = Faker()
    with app.app_context():
        Dog.query.delete()
        User.query.delete()
        Adoption.query.delete()
        Visit.query.delete()
        Review.query.delete()

        print("Starting seed...")

        dogs = seed_dogs()
        users = seed_users()
        seed_adoptions(users, dogs)
        seed_reviews(users, dogs)
        seed_visits(users, dogs)

        print("Seeding complete...")


if __name__ == "__main__":
    main()
