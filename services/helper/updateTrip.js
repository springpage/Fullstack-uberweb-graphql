// Update the review of a trip

const mongoose = require('mongoose');
const Trips = require('../../models/Trip');

module.exports = updateData => {
  const { tripID, reviewText } = updateData;
  return Trips.findByIdAndUpdate(tripID, { review: reviewText });
};
