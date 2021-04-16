# MS3 Cheat-Hub Backend

## Development Server Configuration
- Clone this repository.
- Install/run a virtual environment: `pip install virtualenv`
- Create a virtual environment (name "venv" can be any): `virtualenv venv`
- Within the new venv, install the project's requirements:
`(venv) pip install requirements.txt` 
- Alternatively, just install the requirements: `pip install requirements.txt`

## Available Scripts

In this half of the monorepo, you can run:

### `python run.py`

Serves the Databse backend.\
Runs the backend app in the development mode.\
Open [http://localhost:5000/admin](http://localhost:5000/admin) to view the admin panel in the browser.

Open [http://localhost:5000/api/snippets](http://localhost:5000/api/snippets) to view the JSON response format of all public snippets.

The page will reload if you make edits.\
You will also see any errors in the console.

## Environment Variables

To recreate this server, the following environment variables are required:

### `MONGOODB_HOST`

A connection string from Mongo Atlas for `Mongo Engine` to connect to remotely.

To recreate:
- Create an account with [MongoDB Atlas](https://www.mongodb.com).
- Create a Cluster named `hub`.
- Create a Database named `cheathubdb`.
- Click `Connect` to generate a connection string.

Set the variable to this connection string: 
```python
# env.py
os.environ.setdefault("MONGODB_HOST", "mongodb+srv://<username>:<password>@hub.4kotr.mongodb.net/cheathubdb?retryWrites=true&w=majority")
```

### `SECRET_KEY`

Any key for `Sessions` to work.

Set the variable to this key:
```python
# env.py
os.environ.setdefault("SECRET_KEY", "<your secret key>")
```

### `MONGODB_PORT`

The port to connect to.

Set the variable to this key:
```python
# env.py
os.environ.setdefault("MONGODB_PORT", "5000")
```

### `JWT_SECRET_KEY`

Any string key for JWT to work. 

Set the variable to this key:
```python
# env.py
os.environ.setdefault("JWT_SECRET_KEY", "<your JWT secret key>")
```

## Database Server

Want to create this Database from scratch that works with this code? 

Add the above environment variables to a local `env.py`.
Configure the app's Flask instance to these variables:

```python
# as written in app.py
app.config['SAMPLE_ENV_VAR'] = os.environ.get("SAMPLE_ENV_VAR")
```

The Collections named `snippet`, `user`, and `collection` will automatically be created when documents are made following the classes in this repo. You can also create these collections manually, and add documents on the atlas Cloud interface or Mongo Compass.

### Mongo Shell

You can interact with the database via Mongo shell:
```python
show dbs
use cheathubdb
show collections
db.users.find().pretty()
```

### Adding New Documents

You can add documents via Postman or Mongo Compass.

## Module Documentation
- [Flask Mongo Engine](http://docs.mongoengine.org/projects/flask-mongoengine/en/latest/)
- [Flask CORS](https://flask-cors.readthedocs.io/en/latest/)
- [Flask JWT Extended](https://flask-jwt-extended.readthedocs.io/en/latest/)
- [Flask Admin](https://flask-admin.readthedocs.io/en/latest/)
- [Flask Session](https://flask-session.readthedocs.io/en/latest/)
- [Flask Restful](https://flask-restful.readthedocs.io/en/latest/)
