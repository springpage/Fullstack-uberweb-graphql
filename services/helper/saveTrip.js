// Save a trip to database, also save trip id to the user and driver collection

const mongoose = require('mongoose');
const Trips = require('../../models/Trip');
const Users = require('../../models/User');
const Drivers = require('../../models/Driver');

module.exports = ({ userID, driverID, driverName }) => {
  const newTrip = new Trips({
    _user: userID,
    _driver: driverID,
    driverName: driverName,
    review: '',
    driveDate: Date.now()
  });

  const updateUser = Users.findOne({ _id: userID }).then(user => {
    user.trips.push(newTrip._id);
    return user.save();
  });
  const updateDriver = Drivers.findOne({ _id: driverID }).then(driver => {
    driver.trips.push(newTrip._id);
    return driver.save();
  });

  return Promise.all([newTrip.save(), updateUser, updateDriver]).then(
    results => {
      return results[0];
    }
  );
};
