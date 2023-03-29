# django_react_task

# Requirements
* Python3.10
* React Js
* Pipenv

## Installations

* BACKEND
```
pip install -r requirements.txt
```

* Migrate Backend Models

```
cd ..
cd backend
```

```
python manage.py makemigrations
```

```
python manage.py migrate
```


* FRONTEND

```
cd frontend
```

```
npm install
npm install axios
npm install react-bootstrap bootstrap
```

## Run Django Server

```
python manage.py runserver
```


## Run FrontEnd

open new terminal in `frontend` directory and run this command.

```
npm start
```


## Change open_api_key 
Change in backend.backend.settings.py
OPEN_API_KEY = "sk-"
