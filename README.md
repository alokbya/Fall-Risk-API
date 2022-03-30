# Fall Risk

## Getting Started
To get started, clone this repository to a local directory, navigate into the folder, and restore dependencies.
``` npm
npm install
```

### Database
This application uses MongoDB to store its data. To connect to your own database, create a `.env` file in the root folder and add the following variables.
``` env
MONGO_USER=<my-db-client>
MONGO_PASS=<db-password>
MONGO_CLUSTER=<my-mongo-cluster>
MONGO_DB_NAME=<my-db-name>
```

### Start Application
To start the application, run `npm start` in a terminal at the root folder.

### Notes
This app is using `nodemon` to instantly restart the application server after changes have been saved. This can be modifed by changing the `start` script in `package.json`.

``` JSON
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon server.mjs"
  },
```
Change `nodemon server.mjs` to `npm start server.mjs` to prevent the application from restarting each time a change is saved.
