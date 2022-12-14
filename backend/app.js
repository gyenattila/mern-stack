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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

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

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(4200, () => console.log('Application is running'));
  })
  .catch(error => console.log(error));
