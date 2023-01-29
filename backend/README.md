[Back to root](https://github.com/israelias/cheathub#contents)  
[Go to frontend](https://github.com/israelias/cheathub/tree/master/frontend)

<!-- Anchor for Back To Top -->
<a name="readme-top"></a>

<div align="center">
  <a href="https://github.com/israelias/cheathub/tree/master/backend">
    <img src="https://raw.githubusercontent.com/israelias/cheathub_mono/dev/images/logo_dash_red.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">CheatHub Backend</h3>

  <p align="center">

Application Serverless ETL Query and Resource API
for [@israelias/cheathub/frontend](https://github.com/israelias/cheathub/tree/master/frontend)
<br />
<a href="https://israelias.github.io/chub-etl-api/"><strong>Explore the docs »</strong></a>
<br />
<br />
<a href="https://cheathub-backend.herokuapp.com">View API</a>
·
<a href="https://github.com/israelias/cheathub/issues">Report Bug</a>
·
<a href="https://github.com/israelias/cheathub/pulls">Create a PR</a>
  </p>
</div>


## About The Project

This is the backend of a monorepo. It serves API routes, controls API methods via a simple pattern of `class-resources-database-routes` a la Flask app with an opinionated directory set up (#wantstobedjango).

- Models extend from `db.Document` via `db = MongoEngine()`
- Resource classes extend from `flask_restful.Resource`
- Routes are served via `flask_restful.API`

This repository separates concerns and avoids circular imports by creating `init` functions for each module (`{module}.init_app(app)`) so that the root `app.py` can be as clean as follows:

```python
initialize_db(app)
initialize_routes(api)
initialize_basicauth(app)
initialize_admin(app)
initialize_views()
```

## Backend Deployments
- The restful API is deployed at [cheathub-backend.herokuapp.com/](https://cheathub-backend.herokuapp.com/)
- MkDocs for the DB/API is deployed at [israelias.github.io/chub-etl-api](https://israelias.github.io/chub-etl-api/)

> *Note:* Open API spec is forthcoming. Please see `database/models.py` to preview the snippet, collection and user document models.

<details>
<summary> Don't do it this way, but sadly, here we are </summary>

## Heroku Deployment
It's currently a heroku deployment on the backend. If you so choose to go this route, this is how it happened. 
The project is currently being moved to a different server because Heroku is not ideal.

```bash
#create new git repository and add everything
git init
git add .
git commit -m "Initialize for Heroku deployment"
# heroku git:remote -a cheathub-backend    
git remote add heroku git@heroku.com:cheathub-backend.git

#pull heroku but then checkback out our current local master and mark everything as merged
git pull heroku master
git checkout --ours .
git add -u
git commit -m "merged"

#push back to heroku, open web browser, and remove git repository
git push heroku master
heroku open
rm -fr .git

#go back to wherever we started.
cd -
```

heroku git:remote -a cheathub-backend    
git push heroku master

</details>



## Getting Started

<!-- ENVIRONMENT PREREQUISITES -->

### Environment Prerequisites

> The latest releases Python 3.4+ and Python 2.7.9+, as well as the virtual environments `virtualenv` and `pyvenv`,
> automatically ship with PIP

[Source](https://www.dataquest.io/blog/install-pip-windows/#:~:text=The%20latest%20releases%20Python%203.4,have%20this%20advantage%20by%20default.)

- Please have [`python3`](https://realpython.com/installing-python/) globally installed on your machine.
- Please set environment variables-> jump to [`env.py`](#envpy-the-flask-app-and-db-connection)

### Installation

* Clone the Mono Repo
    ```sh
    git clone ssh://git@github.com/israelias/cheathub.git
    ```
* Jump into this directory
    ```sh
    cd cheathub/backend
    ```
* Create a Virtual Env
    ```sh
     python -m venv venv   
    ```
* Activate your environment
  ```sh
   source venv/bin/activate 
  ```
* Install existing `requirements`
  ```sh
  (venv) pip install -r requirements.txt
  ```
* Run the development environment (Assumes [`env.py`](#envpy-the-flask-app-and-db-connection) is set)
  ```sh
  (venv) python run.py
  ```

## Available Scripts

In this half of the monorepo, you can run:

### `python run.py`

- Serves the Databse backend 
  - There is no local/prod separation here, we connect to Mongo and that is that.
  - Alternatively, you can connect to a local db by replacing the db instance
- Runs the backend app in the development mode.
  - All this means is that debug mode is on
- Open [http://localhost:5000/admin](http://localhost:5000/admin) to view the admin panel in the browser (ensure `BASIC_AUTH` variables are set).
- Open [http://localhost:5000/api/snippets](http://localhost:5000/api/snippets) to view the JSON response format of all public snippets -- assuming `snippet` objects have been created. Otherwise, use Postman to create documents locally (API spec is forthcoming!).

The page will reload if you make edits.
You will also see any errors in the console.

### Deployed Resources

- [/docs](https://israelias.github.io/chub-etl-api/) (Currently served from [israelias/chub-etl-api](https://github.com/israelias/chub-etl-api/) which is a clone of this backend for testing various servers with a reliable Python runtime that is not Heroku)
- [/admin](https://chub-etl-api.vercel.app/admin)
- [/api/snippets](https://chub-etl-api.vercel.app/api/snippets)

## `env.py`: The Flask App and DB Connection

To recreate this backend app and database from scratch add the forthcoming environment variables to a local `env.py`.

```python
# as written in app.py
app.config['SAMPLE_ENV_VAR'] = os.environ.get("SAMPLE_ENV_VAR")
```

The code is written in the app's Flask instance to auto-configure with these `env.py` variables:

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
### `BASIC_AUTH_USERNAME`

Superuser username to access admin panel at `/admin`

Set the variable to this key:
```python
# env.py
os.environ.setdefault("BASIC_AUTH_USERNAME", "<your superuser username>")
```

### `BASIC_AUTH_PASSWORD`

Superuser password to access admin panel at `/admin`

Set the variable to this key:
```python
# env.py
os.environ.setdefault("BASIC_AUTH_USERNAME", "<your superuser password>")
```
### Flask Mail Option
> See [Flask Mail](https://pythonhosted.org/Flask-Mail/)
Similarly, apply the same logic to:
- `MAIL_SERVER`
- `MAIL_PORT`
- `MAIL_USERNAME`
- `MAIL_PASSWORD`
- `MAIL_DEFAULT_SENDER`

<p align="right"><a href="#readme-top">back to top</a></p>

## Database

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
- [Flask Mail](https://pythonhosted.org/Flask-Mail/)

## Resources
- [Heroku Deployment](https://stackoverflow.com/questions/7539382/how-can-i-deploy-push-only-a-subdirectory-of-my-git-repo-to-heroku)
- [Deploying Flask Restful Backend](https://medium.com/analytics-vidhya/flask-restful-api-with-heroku-da1ecf3e04b)

<p align="right"><a href="#readme-top">back to top</a></p>
