// Model for User Collection in the database

const mongoose = require('mongoose');
const { Schema } = mongoose;
const Trips = require('../models/Trip');

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 },
  trips: [{ type: Schema.Types.ObjectId, ref: 'trips' }]
});

mongoose.model('users', userSchema);

const Users = mongoose.model('users', userSchema);
module.exports = Users;
