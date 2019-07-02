'use strict';

const express       = require('express');
const passport      = require('passport')
const bodyParser    = require('body-parser');
const fccTesting    = require('./freeCodeCamp/fcctesting.js');
const session       = require('express-session')
const mongo         = require('mongodb').MongoClient
const Routes        = require('./Routes.js')
const Auth          = require('./Auth.js')
const app           = express();

fccTesting(app); //For FCC testing purposes
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug')


if (process.env.ENABLE_DELAYS) app.use((req, res, next) => {
  switch (req.method) {
    case 'GET':
      switch (req.url) {
        case '/logout': return setTimeout(() => next(), 500);
        case '/profile': return setTimeout(() => next(), 700);
        default: next();
      }
    break;
    case 'POST':
      switch (req.url) {
        case '/login': return setTimeout(() => next(), 900);
        default: next();
      }
    break;
    default: next();
  }
});


mongo.connect(process.env.DATABASE, (err, db) => {
  (err) ? console.log(`Database err: ${err}`) :
  console.log(`Successful db connection to ${db.databaseName}!`)

Auth(app, db)
Routes(app, db)
  
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
  
const PORT = process.env.PORT || 3000
  
app.use((req, res, next) => res.status(404).type('text').send(`Not Found`))
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

});
