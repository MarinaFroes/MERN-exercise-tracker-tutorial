const router = require('express').Router();
let Exercise = require('../models/exercise.model');

// 1st Route - handles incoming HTTP GET Requests on the /exercises url paths
router.route('/').get((req, res) => {
  // .find() - mongoose method that gets a list of all the exercises from the mongoDB Atlas database. It returns a promise.
  Exercise.find()
    // Return exercises in JSON format
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

// 2nd Route - handles incoming HTTP POST Requests
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  // Create a new instance of exercise
  const newExercise = new Exercise({
    username,
    description,
    duration,
    date
  });

  // newUser is saved to the database with the .save() method
  newExercise.save()
    .then(() => res.json('Exercise added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;