const express = require('express');
const router = express.Router();
const database = require("../db/database");

// show all tasks
router.get('/', (req, res) => {
  // Check if user is logged in, if not then redirect to login page
  const userId = req.session.userId;
  if (!userId) {
    return res.redirect('/login');
  }

  // User logged in, display users tasks
  database
    .getUserTasks(userId)
    .then((tasks) => res.send({ tasks }))
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

// select single task
// likely not needed, as it's rendered on the same page and editing will be shown dynamically
router.get('/:id', (req, res) => {
  // res.render('/:id');
});

// add new task
router.post('/', (req, res) => {

  // Check if user is logged in, if not then redirect to login page
  const userId = req.session.userId;
  if (!userId) {
    return res.redirect('/login');
  }

  const newTask = req.body;
  newTask.user_id = userId;

  database
    .addTask(userId)
    .then((task) => res.send(task))
    .catch((e) => {
      console.error(e);
      res.send(e);
    });

});

// update single task
router.post('/:id', (req, res) => {

  // Check if user is logged in, if not then redirect to login page
  const userId = req.session.userId;
  if (!userId) {
    return res.redirect('/login');
  }

  const task = req.body;
  newTask.user_id = userId;

  // update status (complete/incomplete) OR category
  // if category - editTaskCategory(), if status - updateTaskStatus()

});

// delete single task
router.post('/:id/delete', (req, res) => {


  // SQL
  const query = `
  DELETE FROM tasks 
  WHERE task.id = $1`;


});

module.exports = router;