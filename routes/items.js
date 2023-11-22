const express = require('express');
const router = express.Router();
const database = require("../db/database");

// show all items
router.get('/', (req, res) => {
  // Check if user is logged in, if not then redirect to login page
  const userId = req.session.userId;
  if (!userId) {
    return res.redirect('/login');
  }

  // User logged in, display users items
  database
    .getUserItems(userId)
    .then((items) => res.send({ items }))
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

// select single item
router.get('/:id', (req, res) => {



  // res.render('/:id');
});

// add new item
router.post('/', (req, res) => {

  // Check if user is logged in, if not then redirect to login page
  const userId = req.session.userId;
  if (!userId) {
    return res.redirect('/login');
  }

  const newItem = req.body;
  newItem.user_id = userId;

  database
    .addItem(userId)
    .then((item) => res.send(item))
    .catch((e) => {
      console.error(e);
      res.send(e);
    });

});

// update single item
router.post('/:id', (req, res) => {

  // update status (complete/incomplete) OR category

  // if category $1 = category, if status $1 = status + change boolean value based on current (if true, set false - if false, set true)

  // SQL
  const query = `
UPDATE items 
SET $1 = $2 
WHERE item.id = $3;`;


});

// delete single item
router.post('/:id/delete', (req, res) => {


  // SQL
  const query = `
  DELETE FROM items 
  WHERE item.id = $1`;


});

module.exports = router;