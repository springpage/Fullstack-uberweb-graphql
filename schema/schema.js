// Schema file, include Root Query and Mutation, and type definition for all graphql types in this app

const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLSchema,
  GraphQLFloat
} = graphql;
const Users = require('../models/User');
const Trips = require('../models/Trip');
const Drivers = require('../models/Driver');
const findDrivers = require('../services/helper/findDrivers');
const saveTrip = require('../services/helper/saveTrip');
const updateTrip = require('../services/helper/updateTrip');
const getTrips = require('../services/helper/getTrips');

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: GraphQLID },
    googleId: { type: GraphQLID },
    trips: {
      type: GraphQLList(TripType),
      resolve(parentValue, args) {
        return getTrips(parentValue.id);
      }
    }
  })
});

const TripType = new GraphQLObjectType({
  name: 'TripType',
  fields: () => ({
    id: { type: GraphQLString },
    _user: { type: GraphQLID },
    _driver: { type: GraphQLID },
    review: { type: GraphQLString },
    driveDate: { type: GraphQLString },
    driverName: { type: GraphQLString }
  })
});

const GeoType = new GraphQLObjectType({
  name: 'GeoType',
  fields: () => ({
    _id: { type: GraphQLString },
    coordinates: { type: GraphQLList(GraphQLFloat) }
  })
});

const DriverType = new GraphQLObjectType({
  name: 'DriverType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    geometry: { type: GeoType }
  })
});

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        if (req.req) return Users.findById({ _id: req.req._id });
      }
    },
    driver: {
      type: DriverType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Drivers.findById({ _id: id });
      }
    },
    trip: {
      type: TripType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Trips.findById({ _id: id });
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    findDrivers: {
      type: GraphQLList(DriverType),
      args: {
        lat: { type: GraphQLFloat },
        lon: { type: GraphQLFloat }
      },
      resolve(parentValue, { lat, lon }) {
        return findDrivers({ lat, lon });
      }
    },
    saveTrip: {
      type: TripType,
      args: {
        driverID: { type: GraphQLString },
        driverName: { type: GraphQLString }
      },
      resolve(parentValue, { driverID, driverName }, req) {
        return saveTrip({ userID: req.req._id, driverID, driverName });
      }
    },
    updateTrip: {
      type: TripType,
      args: {
        tripID: { type: GraphQLString },
        reviewText: { type: GraphQLString }
      },
      resolve(parentValue, { tripID, reviewText }) {
        return updateTrip({ tripID, reviewText });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: mutation
});
