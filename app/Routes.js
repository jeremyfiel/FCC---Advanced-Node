const express       = require('express');
const passport      = require('passport')
const bcrypt        = require('bcrypt')

const app           = express();


const ensureAuthenticated = (req, res, next) => (req.isAuthenticated()) ? next() : res.redirect('/')

app.route('/')
  .get((req, res) => {res.render(`${process.cwd()}/views/pug/index.pug`,
      {title: 'Home Page',
       message:'Please login',
       showLogin: true,
       showRegistration: true})
                     })
  
app.route('/login')
  .post(passport.authenticate('local', { failureRedirect: '/' }), (req, res) =>
        res.redirect('/profile'))

app.route('/profile')
  .get(ensureAuthenticated, (req, res, next) => {
    req.logIn(req.user, (err) => {
    (err) ? next(err) : res.render(`${process.cwd()}/views/pug/profile.pug`,
      { title: "Profile Page",
        username: req.user.username })})})


app.route('/register')
  .post((req, res, next) => {
  const hash = bcrypt.hashSync(req.body.password, 12) 
db.collection('users').findOne(
  { username: req.body.username },
    (err, user) => (err) ? next(err) : (user) ? res.redirect('/') :
          db.collection('users').insertOne(
            { username: req.body.username,
              password: hash },
            (err, user) => (err) ? res.redirect('/') : next())), 
                passport.authenticate('local', { failureRedirect: '/' }),
                                     (req, res) => res.redirect('/profile')})

app.route('/logout')
  .get((req, res) => {req.logout(); res.redirect('/')})



module.exports = function (app, db) {}
