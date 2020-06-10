const router = require("express").Router();
const db = require("../models");
const { ObjectId } = require('mongodb')

// Handle getting all the workouts 
router.get("/api/workouts", (req, res) => {

  db.Workout.find({})
      .sort({ date: -1 })
      // .populate('exercises')
      .exec((error, dbWorkout)=>{
        if (error) {
          res.status(404).json(error)
      } else {
          res.status(201).json(dbWorkout)
      }
      })
  });
// handle getting all the workouts
router.get("/api/workouts/range", (req, res) => {

  db.Workout.find({})
      .sort({ date: -1 })
      // .populate('exercises')
      .exec((error, dbWorkout)=>{
        if (error) {
          res.status(404).json(error)
      } else {
          res.status(201).json(dbWorkout)
      }
      })
  });
// adding specific exercise to a workout
  router.put("/api/workouts/:id", async (req, res) => {
    let workoutId = req.params.id
    console.log(workoutId)
    console.log(typeof(workoutId))
    console.log(req.body)
    // let newExercise = await db.Exercise.create(req.body)
    
    try {
      let updateResult = await db.Workout.updateOne(
        { _id: ObjectId(workoutId) }, 
        { $push: { exercises: req.body }}
      )
      console.log(updateResult)

      let workoutObj = await db.Workout.findById(ObjectId(workoutId))
      await workoutObj.setTotalDuration()
      await workoutObj.save()
      console.log(workoutObj)
      
      res.status(201).json('success')
    } catch (error) {
      console.log(error)
      res.status(400).json(error)
    }
  
  });
// create a new workout plan
  router.post("/api/workouts", (req, res) => {
    const newWorkout = new db.Workout({
      day: Date.now(),
      exercises: []
    });
    // newWorkout.setTotalDuration();
    newWorkout.save((err)=>{
      if (err) status(400).json(err);
      else res.status(201).json(newWorkout)
    })
  });


module.exports = router;