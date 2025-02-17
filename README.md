# nosql-tp-api-mongoose

## Modifications pour tester

- URL BDD 

MONGO_URI=mongodb://localhost:27017/mongoose?authSource=admin

version: '3.8'
services:
  mongo:
    image: mongo:latest
    container_name: mongo_container
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME:
      MONGO_INITDB_ROOT_PASSWORD:
volumes:
  mongo_data:

- Endpoint racine

/ ne donne plus rien
/profiles donne les profiles
