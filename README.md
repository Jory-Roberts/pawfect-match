# Pawfect Match

![Phase 5 Schema](<'./../Images/Phase-5-Schema%20(1).png>)

## Introduction

Pawfect Match was designed to streamline the adoption process and get our most precious resource, (4 legged balls of fur), matched with their pawfect owners much sooner. Designed around my life long love of dogs, this is a project that I plan to continue to nurture and grow.

User's will be able to see the site contents once they've created their own account. Once inside, user's are encouraged to Adopt, Visit and leave a Review for the dog of their choice!

## Where Do I Start?

`Fork` and `clone` this repo to to your local machine. You can clone to your local machine with `git clone` in your desired local directory followed by copying the `SSH` attached to your persnal [Github](https://github.com) account.

## Setup

### `config.py`

Before you can begin anything with Pawfect Match, you'll need to create a .env file (this is already in the gitignore). This .env will house the SECRET_KEY you'll need to generate on your own local machine in order for this project to launch correctly.

You can create your new `.env` file by running `touch .env` from the command line. This will place it at the top of the file structure, outside of `server/` and `client/` paths.

Generate your secret key by performing the following: python -c 'import os; print(os.urandom(16))'

Inside of your `.env`, set your newly generated secret key to this variable:
`APP_SECRET_KEY=your_secret_key_goes_here`

`config.py`

```
load_dotenv()
app = Flask(__name__)
app.secret_key = os.environ.get("APP_SECRET_KEY")
```

### `server/`

The `server/` directory contains all of the backend code for Pawfect Match.

`app.py` is the main Flask application.

To download the dependencies for the backend for Pawfect Match, run:

```console
pipenv install
pipenv shell
```

You can run Pawfect Match on [`localhost:5555`](http://localhost:5555) by
running:

```console
python server/app.py
```

Check that the Pawfect Match server serves the default route `http://localhost:5555`. You
should see a web page with the heading "Pawfect Match Server".

### `client/`

The `client/` directory contains all of the frontend code for Pawfect Match. The file
`package.json` has been configured with common React application dependencies,
include `react-router-dom`. The file also sets the `proxy` field to forward
requests to `"http://localhost:5555". Feel free to change this to another port-
just remember to configure your Flask app to use another port as well!

To download the dependencies for the Pawfect Match frontend, run:

```console
npm install --prefix client
```

You can run your React app on [`localhost:3000`](http://localhost:3000) by
running:

```sh
npm start --prefix client
```

Check that your the React client displays a default page
`http://localhost:3000`. You should see a Pawfect Match launch in all of its wonderful furry glory!

## Generating The Database

NOTE: The initial project directory structure does not contain the `instance` or
`migrations` folders. Change into the `server` directory:

```console
cd server
```

Then enter the commands to create the `instance` and `migrations` folders and
the database `app.db` file:

```
flask db init
flask db upgrade head
```

### Seeding the Database

```console
cd server
```

Run `python seed.py`. The initial seed structure will be run populating the tables

## Missing Features

There are quite a few features that will be implemented throughout the lifecycle of Pawfect Match. As it stands, any logged in `user` can add a dog to the database. This feature will be changed so that only designated admin users will be able to add and remove dogs from Pawfect Match.

The `user` currently has no way to edit their visit. The backend for this feature is present, only the frontend architecture reamains to be implemented.

The site will be hosted when I have implemented the apppropriate feature fixes. For now, I hope you find your Pawfect Match. Happy coding!

**Thank you to Tom Tobar for creating the handy resource on generating the secret key!**

## Resources

- [Dog Photos](https://commons.wikimedia.org/wiki/List_of_dog_breeds)
- [Secret Key](https://furry-shrimp-4f0.notion.site/Cookies-and-Sessions-Cheatsheet-2e4cbcd1c8ee4d71b8b0da395ebb3fe4?pvs=4)
