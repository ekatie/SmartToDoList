const express = require("express");
const router = express.Router();
const database = require("../db/database");

// show all tasks
router.get("/", (req, res) => {
  // Check if user is logged in, if not then redirect to login page
  const userId = 4;
  if (!userId) {
    return res.redirect("/login");
  }

  // User logged in, display users tasks
  return database
    .getUserTasks(userId)
    .then((tasks) => res.json(tasks))
    .catch((e) => {
      console.error(e);
      res.status(500).json({
        message: "An error was encountered while fetching your tasks!",
      });
    });
});

// Add new task
router.post("/", (req, res) => {
  // Check if user is logged in, if not then redirect to login page
  const userId = 4;
  if (!userId) {
    return res.redirect("/login");
  }

  const newTask = req.body;
  newTask.user_id = userId;

  const creationTimestamp = new Date();
  newTask.created_date = creationTimestamp
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  return database
    .addTask(newTask)
    .then((task) => res.json(task))
    .catch((e) => {
      console.error(e);
      res.status(500).json({ message: "Failed to add new task" });
    });
});

// Update single task - category or is_complete status
router.post("/:id", (req, res) => {
  // Check if user is logged in, if not then redirect to login page
  const userId = 4;
  if (!userId) {
    return res.redirect("/login");
  }

  const task = req.body;
  task.user_id = userId;

  // Call function based on what column value was edited - category or is_complete status
  if (task.categoryId) {
    return database
      .editTaskCategory(task.taskId, task.categoryId)
      .then((task) => res.json(task))
      .catch((e) => {
        console.error(e);
        res.status(500).json({ message: "Failed to update task category" });
      });
  } else {
    return database
      .updateTaskStatus(task.id, task.is_complete)
      .then((task) => res.json(task))
      .catch((e) => {
        console.error(e);
        res.status(500).json({ message: "Failed to update task status" });
      });
  }
});

// delete single task
router.post("/:id/delete", (req, res) => {
  // Check if user is logged in, if not then redirect to login page
  const userId = 4;
  if (!userId) {
    return res.redirect("/login");
  }

  const taskId = req.body.taskId;

  return database
    .deleteTask(taskId)
    .then(() => res.json({ message: 'Task deleted successfully' }))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Failed to delete task" });
    });
});

router.get("/sort/:id", (req, res) => {
  req.session.user_id = 4;

  console.log("route: ", req.params);

  const userId = req.session.user_id;
  const category = req.params.id;

  return database
    .filterTasks(category, userId)
    .then((tasks) => res.json(tasks.rows))
    .catch((e) => {
      console.error(e);
      res.status(500).json({
        message: "An error was encountered while filtering your tasks!",
      });
    });
});

module.exports = router;
