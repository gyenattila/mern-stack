const { v4: ObjectId } = require('uuid');

const HttpError = require('../models/http.error');

const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Captain Jack Sparrow',
    email: 'black@pearl.com',
    password: 'whyistherumgone',
  },
];

exports.getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

exports.signup = (req, res, next) => {
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find(user => user.email === email);

  if (hasUser) {
    return next(new HttpError('Email already exists', 422));
  }

  const createdUser = {
    id: ObjectId(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find(
    user => user.email === email && user.password === password
  );

  if (!identifiedUser) {
    return next(new HttpError('Wrong credentials', 401));
  }

  res.json({ message: 'Logged in' });
};
