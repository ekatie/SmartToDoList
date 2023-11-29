const pool = require("./connection");
const checkForCategoryKeywords = require("../public/scripts/helper");
const OpenAI = require("openai");
//uses the chatGPT API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 *
 * @param {string} userInput takes the task.description of the user
 * @return {string} returns the answer of chatGPT API based on the userInput
 */
async function getCategoryFromAPI(userInput) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    messages: [
      {
        role: "system",
        content:
          "You are a smart to-do list that categorizes user input with only one of the following: eat, watch, read, buy, do",
      },
      { role: "user", content: `${userInput}` },
    ],
    //temperature controls randomness: Lowering results in less random completions. As temperature approaches 0, the model will become deterministic and repetitive.
    temperature: 1,

    //The maximum number of token to generate shared between the prompt and completion. The exact limit varies by model (One token is roughly 4 characters for standard English Text)
    max_tokens: 256,

    //Controls diversity via nucleus sampling: 0.5 means half of all likelihood-weighted options are considered
    top_p: 1,

    //How much to penalize new tokens based on their existing frequency in the text so far. Decreases the model's likelihood to repeat the same line verbatim
    frequency_penalty: 0,

    //How much to penalize new tokens based on  whether they appear in the text so far. Increase the model's likelihood to talk about new topics
    presence_penalty: 0,
    response_format: { type: "text" },
  });

  return completion.choices[0].message.content;
}

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
    .catch((err) => {
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
  ORDER BY
    CASE WHEN completed_date IS NULL THEN 1 ELSE 0 END,
    CASE WHEN is_priority THEN 1 ELSE 0 END,
    created_date;`;

  return pool.query(query, [userId]).then((result) => {
    return result.rows;
  });
};

/**
 * Add a task to the list.
 * @param {{}} task An object containing all of the task details.
 * @return {Promise<{}>} A promise to the task.
 */
const addTask = function (task) {
  // Set due date to null if empty
  task.due_date = task.due_date === "" ? null : task.due_date;

  // Determine task category
  task.category_id = checkForCategoryKeywords(task.description);

  if (!task.category_id) {
    const category_name = getCategoryFromAPI(task.description);
    return checkForCategoryKeywords(category_name)
      ? checkForCategoryKeywords(category_name)
      : 5;
  }

  const query = `
INSERT INTO tasks (user_id, category_id, description, is_complete, created_date, is_priority, due_date)
VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;

  const values = [
    task.user_id,
    task.category_id,
    task.description,
    task.is_complete,
    task.created_date,
    task.is_priority,
    task.due_date,
  ];

  return pool.query(query, values).then((task) => {
    return task;
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

  return pool.query(query, values).then((editedTask) => {
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
      completed_date = ${isComplete ? "NOW()" : "null"}
    WHERE task.id = $2
    RETURNING *;`;

  const values = [isComplete, taskId];

  return pool.query(query, values).then((editedTask) => {
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

  return pool.query(query, values).then((deletedTask) => {
    return deletedTask;
  });
};

module.exports = {
  getUserWithId,
  getUserTasks,
  addTask,
  editTaskCategory,
  updateTaskStatus,
  deleteTask,
};
