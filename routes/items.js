const express = require('express');
const router = express.Router();

// show all items
router.get('/', (req, res) => {

  res.render('items');
});

// select single item
router.get('/:id', (req, res) => {

  res.render('items');
});

// add new item
router.post('/', (req, res) => {


});

// update single item
router.post('/:id', (req, res) => {


});

// delete single item
router.post('/:id/delete', (req, res) => {


});

module.exports = router;