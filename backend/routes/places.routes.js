const express = require('express');

const router = express.Router();

const {
  getPlaceById,
  getPlaceByUserId,
} = require('../controllers/places.controller');

router.get('/:placeId', getPlaceById);

router.get('/user/:userId', getPlaceByUserId);

module.exports = router;
