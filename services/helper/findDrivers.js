// User Mongoose to find Drivers nearby and return a promise
// If not found drivers nearBy, it will generate random drivesr near that location
// and then find again. This time, will found results

const mongoose = require('mongoose');
const Trips = require('../../models/Trip');
const Users = require('../../models/User');
const randomDrivers = require('./randomDrivers');
const Driver = mongoose.model('drivers');

module.exports = mapData => {
  const findResult = tryToFindDrivers(mapData).then(drivers => {
    if (!drivers || drivers.length < 3) {
      return generateFakeDrivers(mapData).then(() => {
        return tryToFindDrivers(mapData).then(drivers => drivers);
      });
    } else {
      return drivers;
    }
  });
  return findResult;
};

function tryToFindDrivers(mapData) {
  const { lat, lon } = mapData;
  return Driver.find({
    'geometry.coordinates': {
      $nearSphere: {
        $geometry: {
          type: 'Point',
          coordinates: [lon, lat]
        },
        $maxDistance: 8000
      }
    }
  }).limit(5);
}

function generateFakeDrivers(mapData) {
  return randomDrivers(mapData);
}
