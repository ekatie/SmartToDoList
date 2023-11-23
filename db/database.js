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
  ORDER BY priority DESC, created_date DESC;`;

  return pool
    .query(query, [userId])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.error("Error fetching user tasks:", err);
      return Promise.reject(err);
    });
};

/**
 * Add a task to the list.
 * @param {{}} task An object containing all of the task details.
 * @return {Promise<{}>} A promise to the task.
 */
const addTask = function (task) {

  const query = `
INSERT INTO tasks (user_id, category_id, description, status, created_date, priority, due_date) 
VALUES ($1, $2, $3, $4, $5, $6, $7);`;

  const values = [task.user_id, task.category_id, task.description, task.status, task.created_date, task.priority, task.due_date];

  return pool
    .query(query, values)
    .then((newTask) => {
      return newTask;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

/**
 * Update a task category on the list.
 * @param {{}} task An object containing all of the task details.
 * @return {Promise<{}>} A promise to the task category.
 */
const editTaskCategory = function (task) {

  const query = `
  UPDATE tasks 
  SET category_id = $1 
  WHERE task.id = $2;`;

  const values = [task.category_id, task.id];

  return pool
    .query(query, values)
    .then((editedTask) => {
      return editedTask;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

/**
 * Update a task status on the list.
 * @param {{}} task An object containing all of the task details.
 * @return {Promise<{}>} A promise to the task status.
 */
const updateTaskStatus = function (task) {

  // change boolean value of status based on current (if true, set false - if false, set true)

  const query = `
  UPDATE tasks 
  SET status = $1 
  WHERE task.id = $2;`;

  const values = [task.status, task.id];

  return pool
    .query(query, values)
    .then((editedTask) => {
      return editedTask;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

module.exports = {
  getUserWithId,
  getUserTasks,
  addTask,
  editTaskCategory,
  updateTaskStatus
};