/** Setup environment variables before start-up the application. */
require('./utils/env-parser.util').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places.routes');
const usersRoutes = require('./routes/users.routes');
const HttpError = require('./models/http.error');

const app = express();

app.use(bodyParser.json());

app.use('/api/places', placesRoutes); // => /api/places/...

app.use('/api/users', usersRoutes); // => /api/users/...

app.use((req, res, next) => {
  return next(new HttpError('Route not found', 404));
});

/**
 * Special Error Handling middleware function.
 */
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res
    .status(error.code || 500)
    .json({ message: error.message || 'An unknown error occurred!' });
});

/**
 * This is just a local mongodb connection string running in Docker.
 * In real application this string must be stored in env variable.
 */
const url = 'mongodb://admin:admin@localhost:27222/?authMechanism=DEFAULT';
mongoose
  .connect(url)
  .then(() => {
    app.listen(3000, () => console.log('Application is running'));
  })
  .catch(error => console.log(error));
