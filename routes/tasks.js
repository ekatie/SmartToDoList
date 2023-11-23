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
  return database
    .getUserTasks(userId)
    .then((tasks) => res.json(tasks))
    .catch((e) => {
      console.error(e);
      res.send(e); // send text to display to user
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

  // API
  // newTask.category_id = api result

  return database
    .addTask(newTask)
    .then((task) => res.json(task)) // use json to send to front end instead of send
    .catch((e) => {
      console.error(e);
      res.status(500).json(e);
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
  // status - true = complete? change to is_complete

  // call function based on what column value was edited - category or isComplete (task status)
  if (task.category) {
    return database
      .editTaskCategory(task.id, task.category)
      .then((task) => res.json(task))
      .catch((e) => {
        console.error(e);
        res.status(500).json(e);
      });
  } else {
    return database
      .updateTaskStatus(task.id, task.is_complete)
      .then((task) => res.json(task))
      .catch((e) => {
        console.error(e);
        res.status(500).json(e);
      });
  }


});

// delete single task
router.post('/:id/delete', (req, res) => {


  // SQL
  const query = `
  DELETE FROM tasks 
  WHERE task.id = $1`;


});

module.exports = router;