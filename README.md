# Crypto marketplace

This project containscurent marketplace summary with backend authentications.

### Node version - 18 (For both frontend and backend)


## Frontend

 - .env.example has been provided. 


```javascript
  # REACT_APP_API_URL - Backend API base url.
  # REACT_APP_SECRET - Strong secre key for authentications
```


## Installation
  Clone the repository.

```bash
  # cd Frontend
  # npm i
  # npm start
```


## Backend

 - .env.example has been provided. 

```javascript
  # PORT - Port for run the nodejs app.
  # MONGO_URI - Mongo connectioin uri.
  # JWT_SECRET - JWT authentication secret.
  # EXPIRES_IN - JWT token expiration key.
  # REDIS_EXPIRE_SEC - Redis expiration key (on seconds)
```

```bash
  # cd Backend
  # npm i
  # npm start
```

## ! important
  If the redis-server is not installed on your local device. You should install and run it first.

## License

[MIT](https://choosealicense.com/licenses/mit/)