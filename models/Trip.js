// Model for Trip Collection in the database
const mongoose = require('mongoose');
const { Schema } = mongoose;

const tripSchema = new Schema({
  review: String,
  driveDate: Date,
  _user: { type: Schema.Types.ObjectId, ref: 'users' },
  _driver: { type: Schema.Types.ObjectId, ref: 'drivers' },
  driverName: String
});

const Trips = mongoose.model('trips', tripSchema);
module.exports = Trips;
