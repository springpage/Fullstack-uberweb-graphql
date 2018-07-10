// Model for Driver Collection in the database
const mongoose = require('mongoose');
const { Schema } = mongoose;

const PointSchema = new Schema({
  type: { type: String, default: 'Point' },
  coordinates: { type: [Number], index: '2dsphere' }
});

const driverSchema = new Schema({
  name: String,
  trips: [{ type: Schema.Types.ObjectId, ref: 'trips' }],
  geometry: PointSchema
});

const Drivers = mongoose.model('drivers', driverSchema);
module.exports = Drivers;
