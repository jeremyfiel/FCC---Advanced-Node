**FreeCodeCamp**
 ## Advanced Node and Express - Registration of New Users

As a reminder, this project is being built upon the following starter project on Glitch, or cloned from GitHub.

Now we need to allow a new user on our site to register an account. On the res.render for the home page add a new variable to the object passed along- showRegistration: true. When you refresh your page, you should then see the registration form that was already created in your index.pug file! This form is set up to POST on /register so this is where we should set up to accept the POST and create the user object in the database.

The logic of the registration route should be as follows: Register the new user > Authenticate the new user > Redirect to /profile

The logic of step 1, registering the new user, should be as follows: Query database with a findOne command > if user is returned then it exists and redirect back to home OR if user is undefined and no error occurs then 'insertOne' into the database with the username and password and as long as no errors occur then call next to go to step 2, authenticating the new user, which we've already written the logic for in our POST /login route.
```
app.route('/register')
  .post((req, res, next) => {
      db.collection('users').findOne({ username: req.body.username }, function (err, user) {
          if(err) {
              next(err);
          } else if (user) {
              res.redirect('/');
          } else {
              db.collection('users').insertOne(
                {username: req.body.username,
                 password: req.body.password},
                (err, doc) => {
                    if(err) {
                        res.redirect('/');
                    } else {
                        next(null, user);
                    }
                }
              )
          }
      })},
    passport.authenticate('local', { failureRedirect: '/' }),
    (req, res, next) => {
        res.redirect('/profile');
    }
);
```
Submit your page when you think you've got it right. If you're running into errors, you can check out the project completed up to this point here.