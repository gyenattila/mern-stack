const { validationResult } = require('express-validator');

const HttpError = require('../models/http.error');
const User = require('../models/user.model');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, '-password');
    return res.json({
      users: users.map(user => user.toObject({ getters: true })),
    });
  } catch (error) {
    return next(new HttpError('Fetching users failed', 500));
  }
};

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed', 422));
  }

  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(new HttpError('Email already in use', 422));
    }
  } catch (error) {
    return next(new HttpError(`Signing up failed with error: ${error}`, 500));
  }

  const createdUser = User({
    name,
    email,
    password,
    imageUrl:
      'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745',
    places: [],
  });

  try {
    await createdUser.save();
  } catch (error) {
    return next(new HttpError(`User save failed with error: ${error}`, 500));
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser || existingUser.password !== password) {
      return next(new HttpError('Wrong credentials', 401));
    }
  } catch (error) {
    return next(new HttpError(`Logging in failed with error: ${error}`, 500));
  }

  res.json({ message: 'Logged in' });
};
