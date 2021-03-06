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

 
// Get the info only of a specific id
// '/:id' is a variable - id is automatically created by mongoDB
router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Deletes only the object associated to the id
router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update
router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;