const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const expressGraphQL = require('express-graphql');
const cors = require('cors');

require('./models/User');
require('./models/Driver');
require('./services/passport');
const schema = require('./schema/schema');
const keys = require('./config/keys');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
// require('./routes/workRoutes')(app);

let origin;
if (process.env.NODE_ENV === 'production') {
  origin = 'https://tranquil-brook-76662.herokuapp.com';
} else {
  origin = 'http://localhost:3000';
}

const corsOptions = {
  origin: origin,
  credentials: true // <-- REQUIRED backend setting
};

app.use(cors(corsOptions));

// Setup graphql

app.use(
  '/graphql',
  graphqlExpress(req => {
    return {
      schema: schema,
      context: {
        req: req.user
      }
    };
  })
);

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
