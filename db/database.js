/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (userId) {
  return pool
    .query(`SELECT * FROM users WHERE id = $1`, [userId])
    .then((user) => {
      return user.rows[0] || null;
    })
    .catch((err) => {
      return Promise.reject(err);
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
  ORDER BY isPriority DESC, created_date DESC;`;

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

  const query = `
INSERT INTO tasks (user_id, category_id, description, isComplete, created_date, isPriority, due_date) 
VALUES ($1, $2, $3, $4, $5, $6, $7);`;

  const values = [task.user_id, task.category_id, task.description, task.isComplete, task.created_date, task.isPriority, task.due_date];

  return pool
    .query(query, values)
    .then((newTask) => {
      return newTask;
    });
};

/**
 * Update a task category on the list.
 * @param {{}} task An object containing all of the task details.
 * @return {Promise<{}>} A promise to the task category.
 */
const editTaskCategory = function (taskId, taskCategoryId) {

  const query = `
  UPDATE tasks 
  SET category_id = $1 
  WHERE task.id = $2;`;

  // Returning? else editedTask is undefined. check!

  const values = [taskCategoryId, taskId];

  return pool
    .query(query, values)
    .then((editedTask) => {
      return editedTask;
    });

};

/**
 * Update a task status on the list.
 * @param {{}} task An object containing all of the task details.
 * @return {Promise<{}>} A promise to the task status.
 */
const updateTaskStatus = function (taskId, isComplete) {

  const query = `
  UPDATE tasks 
  SET isComplete = $1 
  WHERE task.id = $2;`;

  const values = [isComplete, taskId];

  return pool
    .query(query, values)
    .then((editedTask) => {
      return editedTask;
    });

};

module.exports = {
  getUserWithId,
  getUserTasks,
  addTask,
  editTaskCategory,
  updateTaskStatus
};