const express = require('express');

const router = express.Router();

const {
  getPlaceById,
  getPlaceByUserId,
  createPlace,
} = require('../controllers/places.controller');

router.get('/:placeId', getPlaceById);

router.get('/user/:userId', getPlaceByUserId);

router.post('/', createPlace);

module.exports = router;
