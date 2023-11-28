const pool = require('./connection');

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (userId) {
  return pool
    .query(`SELECT * FROM users WHERE id = $1;`, [userId])
    .then((user) => {
      return user.rows[0] || null;
    })
    .catch(err => {
      throw err;
    });
};

/**
 * Get all tasks for a single user.
 * @param {string} userId The id of the user.
 * @return {Promise<[{}]>} A promise to return the tasks.
 */
const getUserTasks = function (userId) {

  const query = `
  SELECT tasks.* 
  FROM tasks 
  JOIN users ON tasks.user_id = users.id 
  JOIN categories ON tasks.category_id = categories.id 
  WHERE user_id = $1 
  ORDER BY is_priority DESC, created_date DESC;`;

  return pool
    .query(query, [userId])
    .then((result) => {
      return result.rows;
    });
};

/**
 * Add a task to the list.
 * @param {{}} task An object containing all of the task details.
 * @return {Promise<{}>} A promise to the task.
 */
const addTask = function (task) {

  // Determine task category
  task.category_id = checkForCategoryKeywords(newTask.description);

  if (!task.category_id) {
    // API call
  }

  const query = `
INSERT INTO tasks (user_id, category_id, description, is_complete, created_date, is_priority, due_date) 
VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;

  const values = [task.user_id, task.category_id, task.description, task.is_complete, task.created_date, task.is_priority, task.due_date];

  return pool
    .query(query, values)
    .then((newTask) => {
      return newTask;
    });
};

/**
 * Update a task category on the list.
 * @param {string} taskId A string containing the task ID.
 * @param {string} taskCategoryId A string containing the task category ID.
 * @return {Promise<{}>} A promise to the task category.
 */
const editTaskCategory = function (taskId, taskCategoryId) {

  const query = `
  UPDATE tasks 
  SET category_id = $1 
  WHERE task.id = $2 RETURNING *;`;

  const values = [taskCategoryId, taskId];

  return pool
    .query(query, values)
    .then((editedTask) => {
      return editedTask;
    });

};

/**
 * Update a task status on the list.
 * @param {string} taskId A string containing the task ID.
 * @param {boolean} isComplete A boolean indicating the updated task status.
 * @return {Promise<{}>} A promise to the task status.
 */
const updateTaskStatus = function (taskId, isComplete) {

  const query = `
    UPDATE tasks 
    SET 
      is_complete = $1, 
      completed_date = ${isComplete ? 'NOW()' : 'null'} 
    WHERE task.id = $2 
    RETURNING *;`;

  const values = [isComplete, taskId];

  return pool
    .query(query, values)
    .then((editedTask) => {
      return editedTask;
    });

};

/**
 * Remove a task from the list.
 * @param {string} taskId A string containing the task ID.
 * @return {Promise<{}>} A promise to the task.
 */
const deleteTask = function (taskId) {

  const query = `
  DELETE FROM tasks 
  WHERE task.id = $1;`;

  const values = [taskId];

  return pool
    .query(query, values)
    .then((deletedTask) => {
      return deletedTask;
    });

};

module.exports = {
  getUserWithId,
  getUserTasks,
  addTask,
  editTaskCategory,
  updateTaskStatus,
  deleteTask
};