// Generate random drivers, if not found any drivers nearby

const faker = require('faker');
const mongoose = require('mongoose');
const Driver = mongoose.model('drivers');

module.exports = mapData => {
  const { lat, lon } = mapData;
  let arrayDrivers = [];
  for (i = 1; i < 10; i++) {
    arrayDrivers.push({
      name: faker.name.findName(),
      geometry: {
        type: 'Point',
        coordinates: [
          lon + randomBetween(-0.05, 0.05),
          lat + randomBetween(-0.05, 0.05)
        ]
      }
    });
  }
  return Driver.create(arrayDrivers);
};

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}
