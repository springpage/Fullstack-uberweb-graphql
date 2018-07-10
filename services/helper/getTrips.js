//Mongoose query to get Trips of a user

const mongoose = require('mongoose');
const Trips = require('../../models/Trip');
const Users = require('../../models/User');

module.exports = userID => {
  const getTrips = Users.findOne({ _id: userID }).then(user => {
    return Trips.find({ _id: { $in: user.trips } })
      .sort({ driveDate: -1 })
      .limit(10);
  });
  return getTrips;
};
