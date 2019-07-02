const router = require('express').Router();
let User = require('../models/user.model');

// 1st Route - handles incoming HTTP GET Requests on the /users url paths
router.route('/').get((req, res) => {
  // .find() - mongoose method that gets a list of all the users from the mongoDB Atlas database. It returns a promise.
  User.find()
    // Return users in JSON format
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// 2nd Route - handles incoming HTTP POST Requests
router.route('/add').post((req, res) => {
  const username = req.body.username;
  // Create a new instance of user
  const newUser = new User({ username });

  // newUser is saved to the database with the .save() method
  newUser.save()
    .then(() => res.json('User added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;