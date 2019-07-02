const passport       = require('passport')
const LocalStrategy  = require('passport-local')
const ObjectID       = require('mongodb').ObjectID
const bcrypt         = require('bcrypt')

passport.use(new LocalStrategy((username, password, done) => {
  db.collection('users').findOne({ username: username }, 
      (err, user) => {
         console.log(`User ${username} attempted to login!`);
    (err) ? done(err) : 
    (!user) ? done(null, false) : 
    (!bcrypt.compareSync(password, user.password)) ? done(null, false) : 
      done(null, user)})}))
  
passport.serializeUser((user, done) => done(null, user._id))
passport.deserializeUser((id, done) => {
  db.collection('users').findOne(
    {_id: new ObjectID(id)},
    (err, user) => done(null, user))})

module.exports = function (app, db) {}