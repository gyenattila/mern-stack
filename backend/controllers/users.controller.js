const { v4: ObjectId } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http.error');
const User = require('../models/user.model');

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

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed', 422));
  }

  const { name, email, password, places } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return next(new HttpError(`Signing up failed with error: ${error}`, 500));
  }

  if (existingUser) {
    return next(new HttpError('Email already in use', 422));
  }

  const createdUser = User({
    name,
    email,
    password,
    imageUrl:
      'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745',
    places,
  });

  try {
    await createdUser.save();
  } catch (error) {
    return next(new HttpError(`User save failed with error: ${error}`, 500));
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
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
