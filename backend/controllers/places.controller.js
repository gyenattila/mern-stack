const { v4: ObjectId } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http.error');
const { getCoordsForAddress } = require('../utils/location');
const Place = require('../models/place.model');

let DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire state',
    description: 'One of the most famous sky scraper',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/800px-Empire_State_Building_%28aerial_view%29.jpg',
    address: '20 W 34th St., New York, NY 10001',
    creatorId: 'u1',
    location: {
      lat: 40.7484,
      lng: -73.9878,
    },
  },
];

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

  try {
    await createdPlace.save();
  } catch (error) {
    return next(new HttpError('Create place failed', 500));
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
      new HttpError(`Error happened when querying place by ID: ${error}`, 500)
    );
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

exports.deletePlace = (req, res, next) => {
  const placeId = req.params.placeId;

  if (!DUMMY_PLACES.find(place => place.id === placeId)) {
    return next(new HttpError('Could not find a place for provided id', 404));
  }

  DUMMY_PLACES = DUMMY_PLACES.filter(place => place.id !== placeId);

  res.status(200).json({ message: 'Place deleted' });
};
