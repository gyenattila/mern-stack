const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http.error');
const { getCoordsForAddress } = require('../utils/location');
const Place = require('../models/place.model');
const User = require('../models/user.model');

exports.getPlaceById = async (req, res, next) => {
  const placeId = req.params.placeId;

  try {
    const place = await Place.findById(placeId).exec();

    if (!place) {
      return next(
        new HttpError(`Place not found with the provided id: ${placeId}`, 404)
      );
    }

    res.json({ place: place.toObject({ getters: true }) });
  } catch (error) {
    return next(
      new HttpError(`Error happened when querying place by ID: ${error}`, 500)
    );
  }
};

exports.getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const places = await Place.find({ creatorId: userId }).exec();

    if (!places || places.length === 0) {
      return next(
        new HttpError(`Place not found with the provided id: ${userId}`, 404)
      );
    }

    res.json({
      places: places.map(place => place.toObject({ getters: true })),
    });
  } catch (error) {
    return next(
      new HttpError(
        `Error happened when querying place by UserID: ${error}`,
        500
      )
    );
  }
};

exports.createPlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed', 422));
  }

  const { title, description, address, creatorId } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/800px-Empire_State_Building_%28aerial_view%29.jpg',
    creatorId,
  });

  let user;
  try {
    user = await User.findById(creatorId);
  } catch (error) {
    return next(
      new HttpError(`Creating place failed with error: ${error}`, 500)
    );
  }

  if (!user) {
    return next(
      new HttpError(`User not found for provided ID: ${creatorId}`, 404)
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    user.places.push(createdPlace);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    return next(new HttpError(`Create place failed with error: ${error}`, 500));
  }

  res.status(201).json({ createdPlace });
};

exports.updatePlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed', 422));
  }

  const { title, description } = req.body;
  const placeId = req.params.placeId;

  let place;
  try {
    place = await Place.findById(placeId).exec();

    if (!place) {
      return next(
        new HttpError(`Place not found with the provided id: ${placeId}`, 404)
      );
    }
  } catch (error) {
    return next(
      new HttpError(`Error happened when querying place by ID: ${error}`, 500)
    );
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (error) {
    return next(
      new HttpError(`Error happened when saving place by ID: ${error}`, 500)
    );
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

exports.deletePlace = async (req, res, next) => {
  const placeId = req.params.placeId;

  let place;
  try {
    place = await Place.findById(placeId).populate('creatorId');

    if (!place) {
      return next(
        new HttpError(`Place not found with the provided id: ${placeId}`, 404)
      );
    }
  } catch (error) {
    return next(
      new HttpError(`Error happened when querying place by ID: ${error}`, 500)
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.remove({ session: sess });
    place.creatorId.places.pull(place);
    await place.creatorId.save({ session: sess });
    await sess.commitTransaction();
    place.remove();
  } catch (error) {
    return next(
      new HttpError(`Error happened when deleting place by ID: ${error}`, 500)
    );
  }

  res.status(200).json({ message: 'Place deleted' });
};
