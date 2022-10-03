const { v4: ObjectId } = require('uuid');

const HttpError = require('../models/http.error');

const DUMMY_PLACES = [
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

exports.getPlaceById = (req, res, next) => {
  const placeId = req.params.placeId;
  const place = DUMMY_PLACES.find(place => place.id === placeId);

  if (!place) {
    return next(
      new HttpError(`Place not found with the provided id: ${placeId}`, 404)
    );
  }

  res.json({ place });
};

exports.getPlaceByUserId = (req, res, next) => {
  const userId = req.params.userId;
  const place = DUMMY_PLACES.find(place => place.creatorId === userId);

  if (!place) {
    return next(
      new HttpError(`Place not found with the provided id: ${userId}`, 404)
    );
  }

  res.json({ place });
};

exports.createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creatorId } = req.body;
  const createdPlace = {
    id: ObjectId(),
    title,
    description,
    location: coordinates,
    address,
    creatorId,
  };

  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({ createdPlace });
};
