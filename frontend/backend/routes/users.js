const router = require("express").Router();
const express = require("express")
let User = require("../models/user.model");

// route to show all of the user's assessments
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// add user route
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const assessments = req.body.assessments;

  const newUser = new User({ username, assessments });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// update assessments
router.route("/update/:id").post((req,res) => {
  User.findById(req.params.id)
    .then(user => {
      user.username = req.body.username;
      user.assessments = req.body.assessments;

      user.save()
        .then(()=> res.json("User information updated"))
        .catch(err => res.status(400).json("Error: " + err))
    })
    .catch(err => res.status(400).json("Error: " + err))
    
})

router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
  