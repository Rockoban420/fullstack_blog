const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const routes = require('./routes');
const helpers = require('./utils');

const hbs = exphbs.create({
  helpers
});

const sequelize = require('./config/connection');

const app = express();

const PORT = process.env.PORT || 3001;

// setup express so that it knows we're using handlebars as our
// template engine


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// setup express to use sessions
// it will create a cookie on the browser
// and cookies are automatically setup between client/server
// we do not need to do any other additional settings from the client/back-end to

//process the cookie
const sessionConfig = {
  secret: 'Super secret secret', // normally this should be an environmental variable
  resave: false,
  saveUninitialized: false,
  // maxAge: 1000 * 60 * 60 * 24
};

// /api/users/signup

// Express middleware
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// This will create a req.session object for every request that comes into our server
// Every route that we declare will have access to req.session
// This "req.session" object will persist data that we store on it
// until we destroy the session or the server shuts down
app.use(session(sessionConfig));

// /users/c75066b2-1082-4a98-8718-4e5536dbac5e
app.use(routes);


sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});

