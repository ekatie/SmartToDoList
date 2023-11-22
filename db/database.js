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
 * Get all items for a single user.
 * @param {string} userId The id of the user.
 * @return {Promise<[{}]>} A promise to return the items.
 */
const getUserItems = function (userId) {

  const query = `
  SELECT * 
  FROM items 
  WHERE user_id = $1
  ORDER BY priority DESC, created_date DESC;`;

  return pool
    .query(query, [userId])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.error("Error fetching user items:", err);
      return Promise.reject(err);
    });
};

/**
 * Add a item to the list.
 * @param {{}} item An object containing all of the item details.
 * @return {Promise<{}>} A promise to the item.
 */
const addItem = function (item) {

  const query = `
INSERT INTO items (user_id, description, category, status, created_date, priority, due_date) 
VALUES ($1, $2, $3, $4, $5, $6, $7);`;

  const values = [item.user_id, item.description, item.category, item.status, item.created_date, item.priority, item.due_date];

  return pool
    .query(query, values)
    .then((newItem) => {
      return newItem;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

module.exports = {
  getUserWithId,
  getUserItems,
  addItem
};